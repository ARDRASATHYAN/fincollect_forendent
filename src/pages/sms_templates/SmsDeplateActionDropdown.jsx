import React, { useState, useRef, useEffect } from "react";
import { ActionDropdown } from "@/components/commen/ButtonGroup";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

const SmsDeplateActionDropdown = ({ data, onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const actions = [
    {
      group: "General",
      items: [{ label: "Edit Sms Deplate", value: "edit", icon: FaEdit }],
    },
    {
      group: "Danger Zone",
      items: [
        { label: "Delete Sms Deplate", value: "delete", icon: FaTrashCan, destructive: true },
      ],
    },
  ];

  const handleAction = (value) => {
    setOpen(false); // close dropdown on click
    switch (value) {
      case "edit":
        onEdit?.(data);
        break;
      case "delete":
        onDelete?.(data.BID, data.TNAME);
        break;
      default:
        break;
    }
  };

  // Close dropdown if click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} onClick={(e) => e.stopPropagation()}>
      <ActionDropdown
        actions={actions}
        onAction={handleAction}
        open={open}
        setOpen={setOpen}
        className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md shadow-sm"
      />
    </div>
  );
};

export default SmsDeplateActionDropdown;
