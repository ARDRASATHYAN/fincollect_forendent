"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import Sidebar from "@/components/commen/SideBar";
import DataTable from "@/components/commen/Table";
import ControlPanel from "@/components/commen/ControlPanel";
import ConfirmAlert from "@/components/commen/ConfirmAlert";
import SmsTemplateFormSheet from "@/components/forms/SmsTemplateForm";
import { getBanks } from "@/apiservices/bankApi";
import useToast from "@/hooks/useToast";
import { getsmstemplateColumns } from "./smstemplateColumns";
import { getSmsTemplateFilters } from "./smstemplateFilters";
import {
  addSmsTemplate,
  deleteSmsTemplate,
  fetchSmsTemplates,
  updateSmsTemplate,
} from "@/apiservices/sms_templateApi";





export default function SmsTemplateList() {
  const { success, error: showError } = useToast();

  const [banks, setBanks] = useState([]);
  const [smstemplates, setSmstemplates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBankId, setSelectedBankId] = useState(null);
  const [selectedCode, setSelectedCode] = useState(null);

  const [smstemplate, setSmstemplate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Fetch banks for filters
  useEffect(() => {
    getBanks().then(setBanks).catch(showError);
  }, []);

  // Auto-load from URL query ?bid=
  useEffect(() => {
    const bidFromUrl = new URLSearchParams(window.location.search).get("bid");
    if (bidFromUrl) setSelectedBankId(bidFromUrl);
  }, []);

  // Fetch SMS templates only if bank is selected
  const fetchTemplates = useCallback(async () => {
    if (!selectedBankId) {
      setSmstemplates([]);
      return;
    }
    try {
      const data = await fetchSmsTemplates({
        bid: selectedBankId,
        tname: selectedCode || "",
        search: searchTerm || "",
      });
      setSmstemplates(data);
    } catch (err) {
      console.error(err);
      showError(err);
    }
  }, [selectedBankId, selectedCode, searchTerm]);

  // Debounce search & filters
  useEffect(() => {
    if (!selectedBankId) return;
    const timer = setTimeout(() => {
      fetchTemplates();
    }, 400);
    return () => clearTimeout(timer);
  }, [fetchTemplates, selectedBankId]);

  // Add/Edit Modal handlers
  const handleAdd = () => {
    setSmstemplate(null);
    setModalOpen(true);
  };

  const handleEdit = (template) => {
    setSmstemplate(template);
    setModalOpen(true);
  };

  const handleAddOrEdit = async (data) => {
    try {
      if (smstemplate) {
        await updateSmsTemplate(smstemplate.BID, smstemplate.TNAME, data);
        success("SMS Template updated successfully!");
      } else {
        await addSmsTemplate(data);
        success("New SMS Template added successfully!");
      }
      setSmstemplate(null);
      setModalOpen(false);
      fetchTemplates();
    } catch (err) {
      console.error(err);
      showError(err);
    }
  };

  // Delete handlers
  const handleDeleteClick = (BID, TNAME) => {
    setDeleteTarget({ BID, TNAME });
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteSmsTemplate(deleteTarget.BID, deleteTarget.TNAME);
      success("SMS Template deleted successfully!");
      fetchTemplates();
    } catch (err) {
      console.error(err);
      showError(err);
    } finally {
      setConfirmOpen(false);
      setDeleteTarget(null);
    }
  };

  // Filters
  const handleFilterChange = (name, option) => {
    if (name === "Bank") setSelectedBankId(option?.id || null);
    if (name === "Tname") setSelectedCode(option?.id || null);
  };

  const handleClearFilters = () => {
    setSelectedBankId(null);
    setSelectedCode(null);
    setSearchTerm("");
  };

  const filters = getSmsTemplateFilters(banks);
  const columns = getsmstemplateColumns(handleDeleteClick, handleEdit);

  return (
    <div className="p-0">
      <Sidebar>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">SMS Template List</h1>
          <button
            onClick={handleAdd}
            className="bg-buttonblue hover:bg-buttonblue-hover text-white px-4 py-2 rounded-lg shadow-md transition"
          >
            + Add
          </button>
        </div>

        {/* Add/Edit Modal */}
        <SmsTemplateFormSheet
          onSubmit={handleAddOrEdit}
          agent={smstemplate}
          isOpen={modalOpen}
          onOpen={() => setModalOpen(true)}
          onClose={() => {
            setModalOpen(false);
            setSmstemplate(null);
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
            <DataTable columns={columns} data={smstemplates} />
          ) : (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500 text-lg">
                Please select a bank to see SMS template data.
              </p>
            </div>
          )}
        </div>

        {/* Delete Confirmation */}
        <ConfirmAlert
          isOpen={confirmOpen}
          title="Delete SMS Template"
          message={
            deleteTarget
              ? `Are you sure you want to delete SMS Template: ${deleteTarget.TNAME}?`
              : ""
          }
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirmOpen(false)}
        />
      </Sidebar>
    </div>
  );
}
