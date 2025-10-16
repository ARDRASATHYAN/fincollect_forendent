

export const getTransactionColumns = () => [
  {
    header: "Bank ID",
    accessorKey: "bid",
  },
  {
    header: "id",
    accessorKey: "id",
  },
  {
    header: "transaction date",
    accessorKey: "tdate",
  },
  {
    header: "rno",
    accessorKey: "rno",
  },
  {
    header: "code",
    accessorKey: "code",
  },
  {
    header: "no",
    accessorKey: "no",
  },
  {
    header: "amount",
    accessorKey: "amount",
  },
   {
    header: "status",
    accessorKey: "status",
  },
   {
    header: "txn_type",
    accessorKey: "txn_type",
  },
   {
    header: "txn_timestamp",
    accessorKey: "txn_timestamp",
  },
//   {
//     header: "Actions",
//     id: "actions",
//     cell: ({ row }) => (
//       <BankActionDropdown
//         data={row.original}
//         // onPreview={handlepreview}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//       />
//     ),
//   },
];