import BuserActionDropdown from "./BuserActionDropdown";





export const getBuserColumns = (handleDelete, handleEdit, handlepreview) => [
  {
    header: "BID",
    accessorKey: "bid",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "phone",
    accessorKey: "mobile",
  },
  {
    header: "Status",
    accessorKey: "status",
  },
 {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => (
      <BuserActionDropdown
        data={row.original}
        onPreview={handlepreview}
        onEdit={handleEdit}
        onDelete={handleDelete}
      
      />
    ),
  },

  // <button
  //         className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
  //         onClick={(e) => {
  //           e.stopPropagation();
  //           handleDelete(row.original.id);
  //         }}
  //       >
  //         Delete
  //       </button> 

  //        <button
  //         className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
  //         onClick={(e) => {
  //           e.stopPropagation();
  //           handleEdit(row.original);
  //         }}
  //       >
  //         Edit
  //       </button> 

  //  {
  //   header: "enabled",
  //   accessorKey: "enabled",
  // },
  //  {
  //   header: "enabled",
  //   accessorKey: "pwdloginattempt",
  // },
  // {
  //   header: "last login date",
  //   accessorKey: "last_login_date",
  //     cell: ({ row }) => row.original.last_login_date ? formatDateTime(row.original.last_login_date) : "-"
  // },
  // {
  //   header: "pwd changed date",
  //   accessorKey: "pwd_changed_date",
  //     cell: ({ row }) => row.original.pwd_changed_date ? formatDateTime(row.original.pwd_changed_date) : "-"
  // },
  //  {
  //   header: "pwd expiry days",
  //   accessorKey: "pwd_expiry_days",
  // },
  //  {
  //   header: "collection status",
  //   accessorKey: "collection_status",
  // },
  // {
  //   header: "print required",
  //   accessorKey: "print_required",
  // },
  // {
  //   header: "sms required",
  //   accessorKey: "sms_required",
  // },

]
