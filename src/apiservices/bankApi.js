import apiClient from "./apilCient";


// Get all banks (with optional search)
export const getBanks = async (searchTerm = "") => {
  const url = searchTerm
    ? `/banks/search/${encodeURIComponent(searchTerm)}`
    : "/banks";
  const res = await apiClient.get(url);
  return res.data;
};


//Fetch single bank
export const getBankById = async (id) => {
  const res = await apiClient.get(`/banks/${id}`);
  return res.data;
};


// Add new bank
export const createBank = async (data) => {
  const res = await apiClient.post("/banks", data);
  return res.data;
};

// Update bank
export const updateBank = async (id, data) => {
  const res = await apiClient.put(`/banks/${id}`, data);
  return res.data;
};

// Delete bank
export const deleteBank = async (id) => {
  const res = await apiClient.delete(`/banks/${id}`);
  return res.data;
};


