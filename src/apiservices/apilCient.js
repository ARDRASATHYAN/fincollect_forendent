import axios from "axios";
import { refreshToken } from "./userApi";

const apiUrl = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL:apiUrl,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;
    console.log("❌ Axios error:", error.response?.status, error.response?.data);

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refreshToken")
    ) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (err) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/";
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
