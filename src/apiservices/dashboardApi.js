import axios from "axios";
import apiClient from "./apilCient";



export const getDashboardData = async () => {
  try {
    const res = await apiClient.get("/dashboard");
    return res.data;
  } catch (err) {
    console.error("Dashboard API Error:", err);
    throw err.response?.data?.error || "Failed to fetch dashboard data";
  }
};
