export const getDepositCodeFilters = (banks = [], depositcode = []) => [
  {
    name: "Bank",
    options: banks.map((b) => ({ id: b.id, label: `${b.name} (${b.id})` })),
  },
  // {
  //   name: "Code",
  //   options: Array.from(new Set(depositcode.map((t) => t.code))).map((c) => ({
  //     id: c,
  //     label: c,
  //   })),
  // },
];
