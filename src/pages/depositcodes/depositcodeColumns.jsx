import TooltipButton from "@/components/commen/TooltipButton";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";


export const getdepositcodeColumns = (handleDelete, handleEdit) => [
  {
    header: "code",
    accessorKey: "code",
  },
  {
    header: "BID",
    accessorKey: "bid",
  },
  {
    header: "description",
    accessorKey: "description",
  },
  {
    header: "times",
    accessorKey: "times",
  },

  {
    header: "multiples",
    accessorKey: "multiples",
  },
  {
    header: "Stmt_req",
    accessorKey: "Stmt_Req",
  },
  {
    header: "Actions",
    accessorKey: "actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <TooltipButton
          label="Edit DepositCode"
          onClick={() => handleEdit(row.original)}
          className="px-2 py-1 bg-blue-600 text-white rounded"
        >
          <FaEdit size={16} />
        </TooltipButton>
        <TooltipButton
          label="Delete DepositCode"
          onClick={() => handleDelete(row.original.bid, row.original.code)}
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
          <FaTrashCan size={16} />
        </TooltipButton>


        {/* <button
          onClick={() => handleDelete(row.original.bid, row.original.code)}
          className="px-2 py-1 bg-red-600 text-white rounded"
        >
          Delete
        </button> */}



        {/* <button
          onClick={() => handleEdit(row.original)}
          className="px-2 py-1 bg-blue-600 text-white rounded"
        >
          Edit
        </button> */}
      </div>
    ),
  },

]
