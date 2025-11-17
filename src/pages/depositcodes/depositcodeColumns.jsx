import TooltipButton from "@/components/commen/TooltipButton";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import AgentActionDropdown from "../agents/AgentActionDropdown";
import DepositCodeActionDropdown from "./DepositCodeActionDropdown";


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
    header: "denomination",
    accessorKey: "denomination",
  },
  {
    header: "Stmt_req",
    accessorKey: "Stmt_Req",
  },
   {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => (
      <DepositCodeActionDropdown
        data={row.original}
        // onPreview={handlepreview}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    ),
  },


]
