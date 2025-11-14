import apiClient from "./apilCient";


export const getDashboardData = async () => {
  const { data } = await apiClient.get("/dashboard");
  return data;
};
