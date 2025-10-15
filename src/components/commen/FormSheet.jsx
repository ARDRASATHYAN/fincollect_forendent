"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export default function UserSheet({
  title = "Add New User",
  saveLabel = "Save",
  onSave,
  onCancel,
  children,
  isOpen,
  onOpen,
  onClose,
}) {
  return (
    <Sheet open={isOpen} onOpenChange={(open) => (open ? onOpen?.() : onClose?.())}>
      <SheetContent side="right" className="flex flex-col w-[400px] sm:w-[480px] p-0" onCancel={onCancel} >
        {/* Header */}
        <div className="border-b p-4">
          <SheetHeader >
            <SheetTitle>{title}</SheetTitle>
          </SheetHeader>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">{children}</div>

        {/* Footer */}
        <div className="border-t bg-white p-4 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            {saveLabel}
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
