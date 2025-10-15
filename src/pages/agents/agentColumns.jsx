
import TooltipButton from "@/components/commen/TooltipButton";
import { FaEdit, FaEye } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";




export const getAgentColumns = (handleDelete, handleEdit, handlepreview) => [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "BID",
    accessorKey: "bid",
  },
  {
    header: "Branch",
    accessorKey: "branch",
  },
  {
    header: "Name",
    accessorKey: "name",
  },

  {
    header: "mname",
    accessorKey: "mname",
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
    accessorKey: "actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
         <TooltipButton
          label="Preview Agent"
          onClick={(e) => {
            e.stopPropagation();
            handlepreview(row.original);
          }}
          className="bg-gray-500 text-white hover:bg-gray-600"
        >
          <FaEye size={16} />
        </TooltipButton>

         <TooltipButton
          label="Edit Agent"
             onClick={(e) => {
            e.stopPropagation();
            handleEdit(row.original);
          }}
          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
        >
          <FaEdit size={16} />
        </TooltipButton>

         <TooltipButton
          label="Delete Agent"
            onClick={(e) => {
            e.stopPropagation();
            handleDelete(row.original.id);
          }}
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
          <FaTrashCan  size={16} />
        </TooltipButton>
        

       
      </div>
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
