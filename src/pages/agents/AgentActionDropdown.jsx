"use client";
import React from "react";
import { ActionDropdown } from "@/components/commen/ButtonGroup";
import { FaEdit, FaEye } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { GrTransaction } from "react-icons/gr";
import { MdSettingsBackupRestore } from "react-icons/md";


const AgentActionDropdown = ({ data, onPreview, onEdit, onDelete, onTransactions,onRestore,className }) => {
  const actions = [
    {
      group: "General",
      items: [
        { label: "Preview Agent", value: "preview", icon: FaEye },
        { label: "View Transactions", value: "transactions", icon: GrTransaction }
      ],
    },
    {
      group: "Action",
      items: [
        { label: "Edit Agent", value: "edit", icon: FaEdit },
        { label: "Restore Transaction", value: "restore", icon: MdSettingsBackupRestore }, // <-- add value
      ],
    },
    {
      group: "Danger Zone",
      items: [
        {
          label: "more…",
          // submenu: [
          //   { label: "Delete Agent", value: "delete", icon: FaTrashCan, destructive: true },
          // ],
        },
      ],
    },
  ];

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
        onDelete?.(data.id);
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
export default AgentActionDropdown;
