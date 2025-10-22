"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/commen/SideBar";
import DataTable from "@/components/commen/Table";
import ControlPanel from "@/components/commen/ControlPanel";
import ConfirmAlert from "@/components/commen/ConfirmAlert";
import AgentFormSheet from "@/components/forms/AgentFormSheet";
import AgentPreviewSheet from "@/components/previewsheet/AgentPreview";
import { getAgentColumns } from "./agentColumns";
import {
  getAgents as fetchAgentsApi,
  deleteAgent,
  updateAgent,
  createAgent,
} from "@/apiservices/agentApi";
import { getBanks } from "@/apiservices/bankApi";
import useToast from "@/hooks/useToast";
import { getAgentFilters } from "./agentFilters";
import TransactionDialog from "./transaction/TransactionDialog";
import { restoreTransaction } from "@/apiservices/transactionApi";

export default function AgentList() {
  const { success, error: showError } = useToast();

  // States
  const [banks, setBanks] = useState([]);
  const [agents, setAgents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBankId, setSelectedBankId] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const [editingAgent, setEditingAgent] = useState(null);
  const [isFormOpen, setFormOpen] = useState(false);

  const [previewAgent, setPreviewAgent] = useState(null);
  const [isPreviewOpen, setPreviewOpen] = useState(false);

  const [agentToDelete, setAgentToDelete] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Fetch banks
  useEffect(() => {
    getBanks().then(setBanks).catch(showError);
  }, []);

  // Fetch agents when filters/search change
  const fetchAgents = async () => {
    if (!selectedBankId) {
      setAgents([]);
      return;
    }
    try {
      const data = await fetchAgentsApi(searchTerm, selectedBankId, selectedStatus);
      setAgents(data);
    } catch (err) {
      console.error(err);
      showError(err);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchAgents, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, selectedBankId, selectedStatus]);

  // Add/Edit
  const handleAdd = () => {
    setEditingAgent(null);
    setFormOpen(true);
  };

  const handleEdit = (agent) => {
    setEditingAgent(agent);
    setFormOpen(true);
  };

 const handleAddOrEdit = async (data) => {
  try {
    if (editingAgent) {
      // Edit mode → update agent
      await updateAgent(editingAgent.bid, editingAgent.id, data);
      success("Agent updated successfully!");
      // Close sheet in edit mode
      setFormOpen(false);
      setEditingAgent(null);
    } else {
      // Add mode → create new agent
      await createAgent(data);
      success("New agent added successfully!");
      // Keep sheet open → reset form but preserve bank
      const currentBank = selectedBankId;
      setEditingAgent(null);
      setFormOpen(true); 
      fetchAgents();    
    }

    // Refresh agents list in both cases
    fetchAgents();

  } catch (err) {
    console.error(err);
    showError(err);
  }
};


  // Preview
  const handlePreview = (agent) => {
    setPreviewAgent(agent);
    setPreviewOpen(true);
  };

  // Delete
  const handleDeleteClick = (id) => {
    setAgentToDelete(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteAgent(agentToDelete);
      success("Agent deleted successfully!");
      fetchAgents();
    } catch (err) {
      console.error(err);
      showError(err);
    } finally {
      setConfirmOpen(false);
      setAgentToDelete(null);
    }
  };

  // Filters
  const handleFilterChange = (name, option) => {
    if (name === "Bank") setSelectedBankId(option?.id || "");
    if (name === "Status") setSelectedStatus(option || "");
  };

  const handleClearFilters = () => {
    setSelectedBankId("");
    setSelectedStatus("");
    setSearchTerm("");
  };

  const filters = getAgentFilters(banks);
  const [transactionDialogOpen, setTransactionDialogOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);


  const handleViewTransactions = (agent) => {
    setSelectedAgent(agent);
    setTransactionDialogOpen(true);
  };
const handleRestoreTransactions = async (agent) => {
  try {
    const result = await restoreTransaction(agent.bid, agent.id);
    success(result.message);  // success toast
    fetchAgents();            // refresh table
  } catch (err) {
    console.error(err);
    showError(err);           // useToast will read err.message
  }
};


  // Inject handler into columns
  const columns = getAgentColumns(handleDeleteClick, handleEdit, handlePreview, handleViewTransactions,handleRestoreTransactions);


  // ✅ Inject preview and edit handlers into columns
  // const columns = getAgentColumns(handleDeleteClick, handleEdit, handlePreview);

  return (
    <div className="p-0">
      <Sidebar>
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold sm:ml-0 ml-12">Agent List</h1>
          <button
            onClick={handleAdd}
            className="bg-buttonblue hover:bg-buttonblue-hover
 text-white px-4 py-2 rounded-lg shadow-md transition"
          >
            + Add
          </button>
        </div>

        {/* ✅ Add/Edit Sheet */}
        <AgentFormSheet
          onSubmit={handleAddOrEdit}
          agent={editingAgent}
          isOpen={isFormOpen}
          onOpen={() => setFormOpen(true)}
          onClose={() => {
            setFormOpen(false);
            setEditingAgent(null);
          }}
        />

        {/* ✅ Preview Sheet */}
        <AgentPreviewSheet
          agent={previewAgent}
          isOpen={isPreviewOpen}
          onOpen={() => setPreviewOpen(true)}
          onClose={() => {
            setPreviewOpen(false);
            setPreviewAgent(null);
          }}
        />

        {/* Filters + Table */}
        <div className="border border-gray-200 rounded-lg  mb-4 bg-white shadow-sm">
          <ControlPanel
            onSearch={setSearchTerm}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />

          {!selectedBankId ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500 text-lg">Please select a bank to see agent data.</p>
            </div>
          ) : (
            <div className="p-2">

            <DataTable columns={columns} data={agents} />
            </div>
          )}
        </div>
        {selectedAgent && (
          <TransactionDialog
            open={transactionDialogOpen}
            onOpenChange={setTransactionDialogOpen}
            agentId={selectedAgent.id}
            bid={selectedAgent.bid}
            agentName={selectedAgent.name}
          />
        )}




        {/* Delete Confirmation */}
        <ConfirmAlert
          isOpen={confirmOpen}
          title="Delete Agent"
          message={
            agentToDelete
              ? `Are you sure you want to delete Agent ID: ${agentToDelete}?`
              : ""
          }
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirmOpen(false)}
        />
      </Sidebar>
    </div>
  );
}
