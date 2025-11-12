import apiClient from "./apilCient";


//Fetch agents (with optional search)
export const getBusers = async (searchTerm = "", bid = "") => {
  const params = {};

  if (searchTerm) params.search = searchTerm; // optional search
  if (bid) params.bid = bid;                 // optional bank ID filter

  const res = await apiClient.get("/buser", { params });
  return res.data;
};



// Fetch single agent
export const getBuserById = async (bid, id) => {
  const res = await apiClient.get(`/buser/${bid}/${id}`);
  return res.data;
};

// Add a new agent
export const createBuser = async (data) => {
  try{
const res = await apiClient.post("/buser", data);
  return res.data;
  
  } catch (err) {
   
    throw new Error(err.response?.data?.error || "buser creation failed");
  }
  
};

// Update an existing agent
// agentApi.js
export const updateBuser = async (bid, id, data) => {
  const res = await apiClient.put(`/buser/${bid}/${id}`, data);
  return res.data;
};


//  Delete agent
export const deleteBuser = async (bid,id) => {
  const res = await apiClient.delete(`/buser/${bid}/${id}`);
  return res.data;
};
