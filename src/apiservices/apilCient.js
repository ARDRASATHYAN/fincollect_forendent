import axios from "axios";
import { refreshToken } from "./userApi";

const apiUrl = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: apiUrl,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    console.log("❌ Axios error:", error.response?.status, error.response?.data);

    // Only handle 401 errors (Unauthorized)
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refreshToken")
    ) {
      originalRequest._retry = true;

      try {
        // Try to refresh token
        const newToken = await refreshToken();

        if (!newToken) throw new Error("No new token received");

        // Save new access token
        localStorage.setItem("accessToken", newToken);

        // Update header and retry original request
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);

      } catch (err) {
        console.error("⚠️ Refresh token failed:", err.message);

        // Check why refresh failed
        if (err.response?.status === 401 || err.response?.status === 403) {
          // Only clear if refresh token is invalid or expired
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/";
        } else {
          // If it's a network issue or server down, don't clear tokens
          console.warn("Temporary issue, not logging out.");
        }

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
