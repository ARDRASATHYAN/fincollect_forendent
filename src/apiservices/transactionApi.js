import apiClient from "./apilCient";

export const getTransactionsByAgent = async (bid, id) => {
  const res = await apiClient.get(`/transaction/${bid}/${id}`);
  return res.data;
};

export const restoreTransaction = async (bid, id) => {
  try {
    const { data } = await apiClient.post(`/transaction/restore/${bid}/${id}`);
    return data; 
  } catch (err) {
   
    throw new Error(err.response?.data?.error || "Restore failed");
  }
};
