"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/commen/SideBar";
import DataTable from "@/components/commen/Table";
import ControlPanel from "@/components/commen/ControlPanel";
import ConfirmAlert from "@/components/commen/ConfirmAlert";
import BuserFormDrawer from "@/components/forms/BuserFormSheet";
import BuserPreviewSheet from "@/components/previewsheet/BuserPreview";
import { getBanks } from "@/apiservices/bankApi";
import { createBuser, deleteBuser, getBusers, updateBuser } from "@/apiservices/buserApi";
import { getBuserColumns } from "./buserColumns";
import { getBuserFilters } from "./buserFilters";
import useToast from "@/hooks/useToast";

export default function BuserList() {
  const { success, error: showError } = useToast();

  // ✅ State
  const [banks, setBanks] = useState([]);
  const [busers, setBusers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBankId, setSelectedBankId] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const [editingBuser, setEditingBuser] = useState(null);
  const [isFormOpen, setFormOpen] = useState(false);

  const [previewBuser, setPreviewBuser] = useState(null);
  const [isPreviewOpen, setPreviewOpen] = useState(false);

  const [buserToDelete, setBuserToDelete] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // ✅ Fetch banks
  useEffect(() => {
    getBanks().then(setBanks).catch(showError);
  }, []);

  // ✅ Fetch busers
  const fetchBusers = async () => {
    if (!selectedBankId) {
      setBusers([]);
      return;
    }
    try {
      const data = await getBusers(searchTerm, selectedBankId, selectedStatus);
      setBusers(data);
    } catch (err) {
      console.error(err);
      showError(err);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchBusers, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, selectedBankId, selectedStatus]);

  // ✅ Add/Edit
  const handleAdd = () => {
    setEditingBuser(null);
    setFormOpen(true);
  };

  const handleEdit = (buser) => {
    setEditingBuser(buser);
    setFormOpen(true);
  };

  const handleAddOrEdit = async (data) => {
    try {
      if (editingBuser) {
        // Edit mode
        await updateBuser(editingBuser.bid, editingBuser.mobile, data);
        success("Bank user updated successfully!");
      } else {
        // Add mode
        await createBuser(data);
        success("New bank user added successfully!");
      }

      fetchBusers();
      setFormOpen(false);
      setEditingBuser(null);
    } catch (err) {
      console.error(err);
      showError(err);
    }
  };

  // ✅ Preview
  const handlePreview = (buser) => {
    setPreviewBuser(buser);
    setPreviewOpen(true);
  };

  // ✅ Delete
  const handleDeleteClick = (bid, mobile) => {
    setBuserToDelete({ bid, mobile });
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteBuser(buserToDelete.bid, buserToDelete.mobile);
      success("Bank user deleted successfully!");
      fetchBusers();
    } catch (err) {
      console.error(err);
      showError(err);
    } finally {
      setConfirmOpen(false);
      setBuserToDelete(null);
    }
  };

  // ✅ Filters
  const handleFilterChange = (name, option) => {
    if (name === "Bank") setSelectedBankId(option?.id || "");
    if (name === "Status") setSelectedStatus(option || "");
  };

  const handleClearFilters = () => {
    setSelectedBankId("");
    setSelectedStatus("");
    setSearchTerm("");
  };

  const filters = getBuserFilters(banks);

  const columns = getBuserColumns(handleDeleteClick, handleEdit, handlePreview);

  // ✅ Render
  return (
    <div className="p-0">
      <Sidebar>
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold sm:ml-0 ml-12">Bank User List</h1>
          <button
            onClick={handleAdd}
            className="bg-buttonblue hover:bg-buttonblue-hover text-white px-4 py-2 rounded-lg shadow-md transition"
          >
            + Add
          </button>
        </div>

        {/* Add/Edit Form */}
        <BuserFormDrawer
          onSubmit={handleAddOrEdit}
          agent={editingBuser}
          isOpen={isFormOpen}
          onOpen={() => setFormOpen(true)}
          onClose={() => {
            setFormOpen(false);
            setEditingBuser(null);
          }}
        />

        {/* Preview Sheet */}
        <BuserPreviewSheet
          agent={previewBuser}
          isOpen={isPreviewOpen}
          onOpen={() => setPreviewOpen(true)}
          onClose={() => {
            setPreviewOpen(false);
            setPreviewBuser(null);
          }}
        />

        {/* Filters + Table */}
        <div className="border border-gray-200 rounded-lg mb-4 bg-white shadow-sm">
          <ControlPanel
            onSearch={setSearchTerm}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />

          {!selectedBankId ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500 text-lg">
                Please select a bank to see bank user data.
              </p>
            </div>
          ) : (
            <div className="p-2">
              <DataTable columns={columns} data={busers} />
            </div>
          )}
        </div>

        {/* Delete Confirmation */}
        <ConfirmAlert
          isOpen={confirmOpen}
          title="Delete Bank User"
          message={
            buserToDelete
              ? `Are you sure you want to delete Bank User ID: ${buserToDelete.bid}-${buserToDelete.mobile}?`
              : ""
          }
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirmOpen(false)}
        />
      </Sidebar>
    </div>
  );
}
