"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/commen/SideBar";
import DataTable from "@/components/commen/Table";
import ControlPanel from "@/components/commen/ControlPanel";
import { getBankColumns } from "./bankColumns";
import BankFormSheet from "@/components/forms/BankFormSheet";
import { getBanks, createBank, updateBank, deleteBank } from "@/apiservices/bankApi";
import useToast from "@/hooks/useToast";
import ConfirmAlert from "@/components/commen/ConfirmAlert";

export default function BankList() {
  const [banks, setBanks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingBankId, setEditingBankId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [bankToDelete, setBankToDelete] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  const { success, error: showError } = useToast();

  const fetchBanks = async () => {
    try {
      const data = await getBanks(searchTerm);
      setBanks(data);
    } catch (error) {
      console.error("Error fetching banks:", error);
      showError(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => fetchBanks(), 400);
    return () => clearTimeout(delay);
  }, [searchTerm]);

  const handleAddOrEdit = async (data) => {
    try {
      if (editingBankId) {
        await updateBank(editingBankId, data);
        success("Bank updated successfully!");
      } else {
        await createBank(data);
        success("New bank added successfully!");
      }
      setEditingBankId(null);
      setModalOpen(false);
      fetchBanks();
    } catch (error) {
      console.error("Error saving bank:", error);
      showError(error);
    }
  };

  const handleEdit = (id) => {
    setEditingBankId(id);
    setModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setBankToDelete(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteBank(bankToDelete);
      success("Bank deleted successfully!");
      fetchBanks();
    } catch (error) {
      console.error(error);
      showError(error);
    } finally {
      setConfirmOpen(false);
      setBankToDelete(null);
    }
  };

  const handleAdd = () => {
    setEditingBankId(null);
    setModalOpen(true);
  };

  const columns = getBankColumns(handleDeleteClick, handleEdit);

  return (
    <div className="p-0">
      <Sidebar>
        {/* Header with top-right Add button */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold sm:ml-0 ml-12">Bank List</h1>
          <button
            onClick={handleAdd}
            className="bg-buttonblue hover:bg-buttonblue-hover
 text-white px-4 py-2 rounded-lg shadow-md transition"
          >
            + Add
          </button>
        </div>

        {/* Bank Form Sheet (Add/Edit) */}
        <BankFormSheet
          onSubmit={handleAddOrEdit}
          bankId={editingBankId}
          isOpen={modalOpen}
          onOpen={() => setModalOpen(true)}
          onClose={() => { setModalOpen(false); setEditingBankId(null); }}
        />

        {/* Search & Table */}
        <div className="border border-gray-200 rounded-lg  bg-white shadow-sm flex flex-col min-h-0">
          <ControlPanel onSearch={setSearchTerm} />
          <div className="p-2">
            <DataTable
              columns={columns}
              data={banks}
            loading={isLoading}
            />
          </div>
        </div>

        {/* Optional Confirm Delete Modal */}
        <ConfirmAlert
          isOpen={confirmOpen}
          title="Delete Bank"
          message={
            bankToDelete
              ? `Are you sure you want to delete Bank ID: ${bankToDelete}?`
              : ""
          }
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirmOpen(false)}
        />
      </Sidebar>
    </div>
  );
}
