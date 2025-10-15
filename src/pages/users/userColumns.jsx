import { formatDateTime } from "@/lib/formatDateTime";


export const getuserColumns =(handleDelete, handleEdit) => [
  
   {
    header: "id",
    accessorKey: "id",
  },
  {
    header: "name",
    accessorKey: "name",
  },
  {
    header: "email",
    accessorKey: "email",
  },
  {
    header: "role",
    accessorKey: "role",
  },
  {
    header: "status",
    accessorKey: "status",
  },
   {
    header: "created_at",
    accessorKey: "created_at",
    cell: ({ row }) => row.original.created_at ? formatDateTime(row.original.created_at) : "-"
  },
   {
    header: "updated_at",
    accessorKey: "updated_at",
    cell: ({ row }) => row.original.updated_at ? formatDateTime(row.original.updated_at) : "-"
  },
  {
    header: "Actions",
    accessorKey: "actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
       <button
          onClick={() => handleDelete(row.original)}
          className="px-2 py-1 bg-red-600 text-white rounded"
        >
          Delete
        </button>

        <button
          onClick={() => handleEdit(row.original)}

          className="px-2 py-1 bg-buttonblue hover:bg-buttonblue-hover
 text-white rounded"
        >
          Edit
        </button>
      </div>
    ),
  },
  
]
