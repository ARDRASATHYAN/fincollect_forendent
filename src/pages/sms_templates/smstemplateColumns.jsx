import TooltipButton from "@/components/commen/TooltipButton";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";


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
    accessorKey: "actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
       <TooltipButton
          label="Edit SmsTemplate"
          onClick={() => handleEdit(row.original)}
          className="bg-buttonblue hover:bg-buttonblue-hover
 text-white"
        >
          <FaEdit size={16} />
        </TooltipButton>

        <TooltipButton
          label="Delete SmsTemplate"
          onClick={() => handleDelete(row.original.BID, row.original.TNAME)}
          className="bg-red-500 text-white"
        >
          <FaTrashCan size={16} />
        </TooltipButton>
      </div>
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
