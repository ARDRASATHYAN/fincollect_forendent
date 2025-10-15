// agentFilters.js
export const getAgentFilters = (banks = []) => [
  {
    name: "Bank",
    options: banks.map((b) => ({ id: b.id, label:  `${b.name} (${b.id})` })),
  },
//   {
//     name: "Status",
//     options: ["Active", "Inactive"],
//   },
  // Add more filters here
];
