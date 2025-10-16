import TooltipButton from "@/components/commen/TooltipButton";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import SmsDeplateActionDropdown from "./SmsDeplateActionDropdown";


export const getsmstemplateColumns =(handleDelete, handleEdit) => [
  
   {
    header: "id",
    accessorKey: "TID",
  },
  {
    header: "BID",
    accessorKey: "BID",
  },
  {
    header: "Template Name",
    accessorKey: "TNAME",
  },
 
  
  {
    header: "messages",
    accessorKey: "MSG",
  },
 
 {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => (
      <SmsDeplateActionDropdown
        data={row.original}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    ),
  },
  
]

{/* <button
          onClick={() => handleDelete(row.original.BID, row.original.TNAME)}
          className="px-2 py-1 bg-red-600 text-white rounded"
        >
          Delete
        </button>

        <button
          onClick={() => handleEdit(row.original)}

          className="px-2 py-1 bg-blue-600 text-white rounded"
        >
          Edit
        </button> */}
