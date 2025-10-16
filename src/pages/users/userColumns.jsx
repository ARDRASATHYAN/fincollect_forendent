import { formatDateTime } from "@/lib/formatDateTime";
import BankActionDropdown from "../banks/BankActionDropDown";
import UserActionDropdown from "./UserActionDropdown";


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
    id: "actions",
    cell: ({ row }) => (
      <UserActionDropdown
        data={row.original}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    ),
  },
  
]
