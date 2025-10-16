import apiClient from "./apilCient";

export const getTransactionsByAgent = async (bid, id) => {
  const res = await apiClient.get(`/transaction/${bid}/${id}`);
  return res.data;
};
