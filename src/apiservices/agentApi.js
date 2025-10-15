import apiClient from "./apilCient";


//Fetch agents (with optional search)
export const getAgents = async (searchTerm = "", bid = "") => {
  const params = {};

  if (searchTerm) params.search = searchTerm; // optional search
  if (bid) params.bid = bid;                 // optional bank ID filter

  const res = await apiClient.get("/agent", { params });
  return res.data;
};



// Fetch single agent
export const getAgentById = async (bid, id) => {
  const res = await apiClient.get(`/agent/${bid}/${id}`);
  return res.data;
};

// Add a new agent
export const createAgent = async (data) => {
  const res = await apiClient.post("/agent", data);
  return res.data;
};

// Update an existing agent
// agentApi.js
export const updateAgent = async (bid, id, data) => {
  const res = await apiClient.put(`/agent/${bid}/${id}`, data);
  return res.data;
};


//  Delete agent
export const deleteAgent = async (id) => {
  const res = await apiClient.delete(`/agent/${id}`);
  return res.data;
};
