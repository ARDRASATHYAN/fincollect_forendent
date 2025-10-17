"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "../ui/input";
import UserSheet from "../commen/FormSheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "../ui/label";

// Validation schema
const validationSchema = yup.object().shape({
  id: yup.string().max(10),
  name: yup.string().required("Name is required").max(75),
  email: yup.string().required("Email is required").email("Invalid email").max(200),
  role: yup.string().required("Role is required").max(50),
  status: yup.boolean(),
  password: yup.string().max(100), // optional on edit
});

// Default form values
const defaultValues = {
  id: "",
  name: "",
  email: "",
  role: "user",
  status: true,
  password: "",
};

export default function UserForm({ user = null, onSubmit, isOpen, onOpen, onClose }) {
  const [isEditing, setIsEditing] = useState(false);

  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  // Watch role for Select
  const roleValue = watch("role");
  const statusValue = watch("status");

  // Prefill form when editing
  useEffect(() => {
    if (user) {
      reset({
        id: user.id || user._id || "",
        name: user.name || "",
        email: user.email || "",
        role: user.role || "user",
        status: user.status === 1 || user.status === true,
        password: "",
      });
      setIsEditing(true);
    } else {
      reset(defaultValues);
      setIsEditing(false);
    }
  }, [user, reset]);

  const handleSave = (data) => {
    onSubmit?.(data);
    reset(defaultValues);
    onClose?.();
  };

  const handleCancel = () => {
    reset(defaultValues);
    onClose?.();
  };

  return (
    <UserSheet
      title={isEditing ? "Edit User" : "Add New User"}
      saveLabel={isEditing ? "Save Changes" : "Save"}
      isOpen={isOpen}
      onOpen={onOpen}
      onSave={handleSubmit(handleSave)}
      onCancel={handleCancel}
    >
      <form id="user-form" className=" space-y-4">
        {/* ID (disabled on edit) */}


 {/* <div className="flex flex-col">
  <Label htmlFor="tid">ID</Label>

        <Input
          {...register("id")}
          placeholder="ID"
          disabled={isEditing}
          className={isEditing ? "bg-gray-100 cursor-not-allowed" : " mt-2"}
        />
        {errors.id && <p className="text-red-500 text-sm">{errors.id.message}</p>}
         </div> */}

        <div className="flex flex-col">
           <Label htmlFor="tid">Name</Label>
     
        <Input {...register("name")} placeholder="Name"  className="mt-2"/>
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
 </div>
        <div className="flex flex-col">
           <Label htmlFor="tid">Email</Label>
      
        <Input {...register("email")} placeholder="Email" type="email" className="mt-2"/>
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
 </div>
        <div className="flex flex-col">
           <Label htmlFor="tid" className="mb-2">Role</Label>
       
       
          <Select value={roleValue} onValueChange={(val) => setValue("role", val)} >
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectContent>
          </Select>
       
        {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
 </div>
        <div className="flex flex-col">
           <Label htmlFor="tid">Password</Label>
    
        <Input {...register("password")} placeholder="Password" type="password"   disabled={isEditing}  className="mt-2"/>
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
 </div>
       <div className="flex flex-col">
         <Label htmlFor="tid">Status</Label>
      
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={statusValue}
            onChange={(e) => setValue("status", e.target.checked)} className="mt-2"
          />
          <span>Active</span>
        </label>
         </div>
      </form>
    </UserSheet>
  );
}
