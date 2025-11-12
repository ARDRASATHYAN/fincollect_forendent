"use client";
import React from "react";
import { ActionDropdown } from "@/components/commen/ButtonGroup";
import { FaEdit, FaEye } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { GrTransaction } from "react-icons/gr";
import { MdSettingsBackupRestore } from "react-icons/md";


const BuserActionDropdown = ({ data, onPreview, onEdit, onDelete,className }) => {

  const user = JSON.parse(localStorage.getItem("user") || "{}");
const isAdmin = user.role === "admin";
  
  const actions = [
    {
      group: "General",
      items: [
        { label: "buser Details", value: "preview", icon: FaEye },
      ],
    },
    {
      group: "Action",
      items: [
        { label: "Edit buser", value: "edit", icon: FaEdit },
      ],
    },
  ];

  // Conditionally add Danger Zone for admin
  if (isAdmin) {
  actions.push({
    group: "Danger Zone",
    items: [
      
       { label: "Delete buser", value: "delete", icon: FaTrashCan, destructive: true },
       
         
      
      
    ],
  });
}

  const handleAction = async (value) => {  
    switch (value) {
      case "preview":
        onPreview?.(data);
        break;
      case "edit":
        onEdit?.(data);
        break;
      case "transactions":
        onTransactions?.(data);
        break;
      case "restore":
  onRestore?.(data); 
  break;
      case "delete":
       onDelete?.(data.bid, data.mobile);

        break;
      default:
        break;
    }
  };

  return (
    <div
      className="flex items-center justify-center"
      onClick={(e) => e.stopPropagation()}
    >
      <ActionDropdown
        actions={actions}
        onAction={handleAction}
        className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md shadow-sm"
      />
    </div>
  );
};
export default BuserActionDropdown;
