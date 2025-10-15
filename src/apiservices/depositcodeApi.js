

// Fetch all or search
// export const fetchDepositCodes = async (searchTerm = "") => {
//   const url = searchTerm
//     ? `/depositcode/search/${encodeURIComponent(searchTerm)}`
//     : "/depositcode";
//   const response = await apiClient.get(url);
//   return response.data;

import apiClient from "./apilCient";

// };
export const fetchDepositCodes = async (bid = "", code = "", search = "") => {
  // Ensure all values are strings, not objects
  const params = {};
  if (bid && typeof bid === "string") params.bid = bid;
  if (code && typeof code === "string") params.code = code;
  if (search && typeof search === "string") params.search = search;

  const res = await apiClient.get("/depositcode", { params });
  return res.data;
};




// Get single deposit code by bid + code
export const getDepositCodeById = async (bid, code) => {
  const response = await apiClient.get(`/depositcode/${bid}/${code}`);
  return response.data;
};

// Add new deposit code
export const addDepositCode = async (data) => {
  const response = await apiClient.post("/depositcode", data);
  return response.data;
};

// Update existing deposit code
export const updateDepositCode = async (bid, code, data) => {
  const response = await apiClient.put(`/depositcode/${bid}/${code}`, data);
  return response.data;
};

// Delete deposit code
export const deleteDepositCode = async (bid, code) => {
  const response = await apiClient.delete(`/depositcode/${bid}/${code}`);
  return response.data;
};
