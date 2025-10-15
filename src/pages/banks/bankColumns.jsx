import TooltipButton from "@/components/commen/TooltipButton";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

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
    accessorKey: "actions",
    cell: ({ row }) => (
      <div className="flex gap-2">

         <TooltipButton
                  label="Edit bank"
                 onClick={(e) => {
            e.stopPropagation();
            handleEdit(row.original.id);
          }}
                  className="px-2 py-1 bg-buttonblue hover:bg-buttonblue-hover
 text-white rounded"
                >
                  <FaEdit size={16} />
                </TooltipButton>
                <TooltipButton
                  label="Delete bank"
                  onClick={(e) => {
            e.stopPropagation();
            handleDelete(row.original.id);
          }}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  <FaTrashCan size={16} />
                </TooltipButton>
       
      </div>
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
