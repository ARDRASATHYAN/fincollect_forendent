import apiClient from "./apilCient";


export const loginUser = async ({ email, password }) => {
  const res = await apiClient.post("/users/login", { email, password });
  localStorage.setItem("accessToken", res.data.accessToken);
  localStorage.setItem("refreshToken", res.data.refreshToken);
   localStorage.setItem("user", JSON.stringify(res.data.user));
  return res.data;
};

export const refreshToken = async () => {
  const token = localStorage.getItem("refreshToken");
  if (!token) throw new Error("No refresh token");

  const res = await apiClient.post("/users/refresh-token", { token });
  localStorage.setItem("accessToken", res.data.accessToken);
  return res.data.accessToken;
};

// Fetch all users (optional search & filters)
export const getUsers = async (searchTerm = "", role = "") => {
  const params = {};
  if (searchTerm) params.search = searchTerm;
  if (role) params.role = role;

  const res = await apiClient.get("/users", { params });
  return res.data;
};

// Fetch single user by ID
export const getUserById = async (id) => {
  const res = await apiClient.get(`/users/${id}`);
  return res.data;
};

// Add a new user
export const createUser = async (data) => {
  const res = await apiClient.post("/users", data);
  return res.data;
};

// Update an existing user
export const updateUser = async (id, data) => {
  const res = await apiClient.put(`/users/${id}`, data);
  return res.data;
};

// Delete a user
export const deleteUser = async (id) => {
  const res = await apiClient.delete(`/users/${id}`);
  return res.data;
};

// export const loginUser = async ({ email, password }) => {
//   try {
//     const response = await apiClient.post("/users/login", { email, password });
//     return response.data; // this could include token, user info, etc.
//   } catch (error) {
//     throw error.response?.data || { message: "Login failed" };
//   }
// };

export const forgotPassword = async (email) => {
  try {
    const res = await apiClient.post("/users/forgot-password", { email });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to send reset link" };
  }
};

// 🔹 Reset password using token
export const resetPassword = async (token, password) => {
  try {
    const res = await apiClient.post("/users/reset-password", { token, password });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to reset password" };
  }
};




