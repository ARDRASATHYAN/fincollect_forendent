// smstemplateFilters.js
export const getSmsTemplateFilters = (banks = [], templates = []) => [
  {
    name: "Bank",
    options: banks.map((b) => ({ id: b.id, label:  `${b.name} (${b.id})`})), // show name
  },
{
    name: "Tname",
    options: Array.from(
      new Set(templates.map((t) => t.tname || t.TNAME))
    ).map((uniqueName) => ({ id: uniqueName, label: uniqueName })),
  },
];
