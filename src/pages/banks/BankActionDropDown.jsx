"use client";
import React from "react";
import { ActionDropdown } from "@/components/commen/ButtonGroup";
import { FaEdit, FaEye } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";


const BankActionDropdown = ({ data, onEdit, onDelete }) => {
  const actions = [
    {
      group: "General",
      items: [
        { label: "Edit Bank", value: "edit", icon: FaEdit },
      ],
    },
    {
      group: "Danger Zone",
      items: [
        { label: "Delete Bank", value: "delete", icon: FaTrashCan, destructive: true },
      ],
    },
  ];

  const handleAction = (value) => {
    switch (value) {
      case "edit":
        onEdit?.(data.id);
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

export default BankActionDropdown;
