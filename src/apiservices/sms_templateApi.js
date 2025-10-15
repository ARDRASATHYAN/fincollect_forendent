import apiClient from "./apilCient";

// Fetch all templates (with optional search)
// export const fetchSmsTemplates = async (searchTerm = "") => {
//   const url = searchTerm
//     ? `/smstemplate/search/${encodeURIComponent(searchTerm)}`
//     : "/smstemplate";
//   const response = await apiClient.get(url);
//   return response.data;
// };
export const fetchSmsTemplates = async ({ bid = "", tname = "", search = "" } = {}) => {
  const params = new URLSearchParams();

  if (bid) params.append("bid", bid);
  if (tname) params.append("tname", tname);
  if (search) params.append("search", search);

  const url = `/smstemplate?${params.toString()}`;
  const response = await apiClient.get(url);
  return response.data;
};


//Get single template
export const getSmsTemplateById = async (BID, TNAME) => {
  const response = await apiClient.get(`/smstemplate/${BID}/${TNAME}`);
  return response.data;
};

// Add new template
export const addSmsTemplate = async (data) => {
  const response = await apiClient.post("/smstemplate", data);
  return response.data;
};

// Update template
export const updateSmsTemplate = async (BID, TNAME, data) => {
  const response = await apiClient.put(`/smstemplate/${BID}/${TNAME}`, data);
  return response.data;
};

//  Delete template
export const deleteSmsTemplate = async (BID, TNAME) => {
  const response = await apiClient.delete(`/smstemplate/${BID}/${TNAME}`);
  return response.data;
};
