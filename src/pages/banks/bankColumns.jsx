import TooltipButton from "@/components/commen/TooltipButton";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import BankActionDropdown from "./BankActionDropDown";

export const getBankColumns = (handleDelete, handleEdit) => [
  {
    header: "Bank ID",
    accessorKey: "id",
  },
  {
    header: "Bank Name",
    accessorKey: "name",
  },
  {
    header: "Phone",
    accessorKey: "phone",
  },
  {
    header: "Address",
    accessorKey: "address",
  },
  {
    header: "SMS User ID",
    accessorKey: "sms_uid",
  },
  {
    header: "SMS Password",
    accessorKey: "sms_pwd",
  },
  {
    header: "Cancel Mode",
    accessorKey: "cancel_mode",
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => (
      <BankActionDropdown
        data={row.original}
        // onPreview={handlepreview}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    ),
  },
];
//  <button
//           className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//           onClick={(e) => {
//             e.stopPropagation();
//             handleDelete(row.original.id);
//           }}
//         >
//           Delete
//         </button>

//         <button
//           className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
//           onClick={(e) => {
//             e.stopPropagation();
//             handleEdit(row.original.id);
//           }}
//         >
//           Edit
//         </button>
