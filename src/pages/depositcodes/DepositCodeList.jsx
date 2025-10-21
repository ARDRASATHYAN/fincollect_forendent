"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/commen/SideBar";
import DataTable from "@/components/commen/Table";
import ControlPanel from "@/components/commen/ControlPanel";
import ConfirmAlert from "@/components/commen/ConfirmAlert";
import { getBanks } from "@/apiservices/bankApi";
import useToast from "@/hooks/useToast";
import { getdepositcodeColumns } from "./depositcodeColumns";
import { getDepositCodeFilters } from "./depositcodeFilters";
import {
  addDepositCode,
  deleteDepositCode,
  fetchDepositCodes,
  updateDepositCode,
} from "@/apiservices/depositcodeApi";
import DepositCodeFormSheet from "@/components/forms/DepositCodeFromSheet";

export default function DepositCodeList() {
  const { success, error: showError } = useToast();

  const [banks, setBanks] = useState([]);
  const [depositcode, setDepositCode] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBankId, setSelectedBankId] = useState("");
  const [selectedCode, setSelectedCode] = useState("");

  const [editdpcode, setEditDpCode] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [agentToDelete, setAgentToDelete] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Fetch banks for filter dropdown
  useEffect(() => {
    getBanks().then(setBanks).catch(showError);
  }, []);

  // Fetch deposit codes for the selected bank
  const fetchData = async () => {
    if (!selectedBankId) {
      setDepositCode([]); // clear data if no bank selected
      return;
    }
    try {
      const data = await fetchDepositCodes(selectedBankId, selectedCode, searchTerm);
      setDepositCode(data);
    } catch (err) {
      console.error(err);
      showError(err);
    }
  };

  // Debounce search & filter changes
  useEffect(() => {
    const timer = setTimeout(fetchData, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, selectedBankId, selectedCode]);

  // Add/Edit modal
  const handleAdd = () => {
    setEditDpCode(null);
    setModalOpen(true);
  };

  const handleEdit = (agent) => {
    setEditDpCode(agent);
    setModalOpen(true);
  };

 const handleAddOrEdit = async (data) => {
  try {
    if (editdpcode) {
      await updateDepositCode(editdpcode.bid, editdpcode.code, data);
      success("DepositCode updated successfully!");
      setModalOpen(false); // close after edit
    } else {
      await addDepositCode(data);
      success("New DepositCode added successfully!");
      // Do NOT close modal; table will refresh
    }

    fetchData(); // refresh table data
  } catch (err) {
    console.error(err);
    showError(err);
  }
};


  // Delete handlers
  const handleDeleteClick = (bid, code) => {
    setAgentToDelete({ bid, code });
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteDepositCode(agentToDelete.bid, agentToDelete.code);
      success("Deposit code deleted successfully!");
      fetchData();
    } catch (err) {
      console.error(err);
      showError(err);
    } finally {
      setConfirmOpen(false);
      setAgentToDelete(null);
    }
  };

  // Filter change handlers
  const handleFilterChange = (name, value) => {
    if (name === "Bank") setSelectedBankId(value?.id || "");
    if (name === "Code") setSelectedCode(value?.id || "");
  };

  const handleClearFilters = () => {
    setSelectedBankId("");
    setSelectedCode("");
  };

  const filters = getDepositCodeFilters(banks);
  const columns = getdepositcodeColumns(handleDeleteClick, handleEdit);

  return (
    <div className="p-0">
      <Sidebar>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
           <h1 className="text-2xl font-bold sm:ml-0 ml-12">DepositCode List</h1>
          <button
            onClick={handleAdd}
            className="bg-buttonblue hover:bg-buttonblue-hover
 text-white px-4 py-2 rounded-lg shadow-md transition"
          >
            + Add
          </button>
        </div>

        {/* Add/Edit Modal */}
        <DepositCodeFormSheet
          onSubmit={handleAddOrEdit}
          agent={editdpcode}
          isOpen={modalOpen}
          onOpen={() => setModalOpen(true)}
          onClose={() => {
            setModalOpen(false);
            setEditDpCode(null);
          }}
        />

        {/* Search + Filters + Table */}
        <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-white shadow-sm min-h-[200px] flex flex-col">
          <ControlPanel
            onSearch={setSearchTerm}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />

          {selectedBankId ? (
            <DataTable columns={columns} data={depositcode} />
          ) : (
            <div className="flex justify-center items-center h-64">
  <p className="text-gray-500 text-lg">Please select a bank to see deposit code data.</p>
</div>
          )}
        </div>

        {/* Delete Confirmation */}
        <ConfirmAlert
          isOpen={confirmOpen}
          title="Delete DepositCode"
          message={
            agentToDelete
              ? `Are you sure you want to delete DepositCode ${agentToDelete.code}?`
              : ""
          }
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirmOpen(false)}
        />
      </Sidebar>
    </div>
  );
}
