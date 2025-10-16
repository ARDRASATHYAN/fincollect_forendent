"use client";
import React, { useState, useEffect } from "react";
import ReusableDialog from "@/components/commen/ReusableDialog";
import DataTable from "@/components/commen/Table";
import { getTransactionColumns } from "./transactionColumns";
import { getTransactionsByAgent } from "@/apiservices/transactionApi";

export default function TransactionDialog({ agentId, bid, open, onOpenChange }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const columns = getTransactionColumns();

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!agentId || !bid) return;
      setLoading(true);
      try {
        const data = await getTransactionsByAgent(bid, agentId);
        setTransactions(Array.isArray(data) ? data : [data]); // ensure array
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    if (open) fetchTransactions();
  }, [open, agentId, bid]);

  return (
    <ReusableDialog title="Transactions" open={open} onOpenChange={onOpenChange} fullWidth>
      {loading ? (
        <p>Loading...</p>
      ) : transactions.length ? (
        <DataTable columns={columns} data={transactions} />
      ) : (
        <p>No transactions found.</p>
      )}
    </ReusableDialog>
  );
}
