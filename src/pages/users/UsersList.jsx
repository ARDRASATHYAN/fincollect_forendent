"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/commen/SideBar";
import DataTable from "@/components/commen/Table";
import ControlPanel from "@/components/commen/ControlPanel";
import ConfirmAlert from "@/components/commen/ConfirmAlert";
import useToast from "@/hooks/useToast";

import { getuserColumns } from "./userColumns";
import { getUsers, createUser, updateUser, deleteUser } from "@/apiservices/userApi";
import UserForm from "@/components/forms/UserForm";

export default function UserList() {
  const { success, error: showError } = useToast();

  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});

  // Fetch users
  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      showError(err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleAdd = () => {
    setSelectedUser(null);
    setModalOpen(true);
  };

  const handleEdit = (user) => {
    console.log("user",user);
    
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleAddOrEdit = async (data) => {
    try {
      if (selectedUser) {
        console.log("selecteduser",selectedUser.id);
        
        const userId = selectedUser.id || selectedUser._id;
        const payload = { ...data };
        if (!payload.password) delete payload.password; // don't overwrite password if empty
        await updateUser(userId, payload);
        success("User updated successfully");
      } else {
        await createUser(data);
        success("User added successfully");
      }
      setModalOpen(false);
      setSelectedUser(null);
      loadUsers();
    } catch (err) {
      showError(err);
    }
  };

  const handleDeleteClick = (user) => {
    console.log("delect user",user);
    
    setDeleteTarget(user);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
  try {
    await deleteUser(deleteTarget.email); // pass email instead of id
    success("User deleted successfully");
    setConfirmOpen(false);
    setDeleteTarget(null);
    loadUsers();
  } catch (err) {
    showError(err);
  }
};

const filteredUsers = users.filter((user) => {
  const term = searchTerm.toLowerCase();
  return (
    user.name?.toLowerCase().includes(term) ||
    user.email?.toLowerCase().includes(term) ||
    user.role?.toLowerCase().includes(term)
  );
});



  const handleFilterChange = (newFilters) => setFilters(newFilters);
  const handleClearFilters = () => setFilters({});

  const columns = getuserColumns(handleDeleteClick, handleEdit);

  return (
    <div className="p-0">
      <Sidebar>
        <div className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-bold sm:ml-0 ml-12">User List</h1>


          <button
            onClick={handleAdd}
            className="bg-buttonblue hover:bg-buttonblue-hover
 text-white px-4 py-2 rounded-lg shadow-md transition"
          >
            + Add
          </button>
        </div>

        <UserForm
          onSubmit={handleAddOrEdit}
          user={selectedUser}
          isOpen={modalOpen}
          onOpen={() => setModalOpen(true)}
          onClose={() => {
            setModalOpen(false);
            setSelectedUser(null);
          }}
        />

        <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-white shadow-sm min-h-[200px] flex flex-col">
          <ControlPanel
            onSearch={setSearchTerm}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
          <DataTable columns={columns} data={filteredUsers} />
        </div>

        <ConfirmAlert
          isOpen={confirmOpen}
          title="Delete User"
          message={deleteTarget ? `Are you sure you want to delete user: ${deleteTarget.email}?` : ""}
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirmOpen(false)}
        />
      </Sidebar>
    </div>
  );
}
