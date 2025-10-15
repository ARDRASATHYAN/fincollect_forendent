"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "../ui/input";
import { getBankById } from "@/apiservices/bankApi";
import UserSheet from "../commen/FormSheet";
import { Label } from "../ui/label";


const validationSchema = yup.object().shape({
  id: yup
    .string()
    .required("ID is required.")
    .max(10, "ID cannot exceed 10 characters."),

  name: yup
    .string()
    .required("Name is required.")
    .max(75, "Name cannot exceed 75 characters."),

  address: yup
    .string()
    .required("Address is required.")
    .max(200, "Address cannot exceed 200 characters."),

  phone: yup
    .string()
    .required("Phone is required")
    .matches(
      /^(\d{10}|(\d{2,4}[- ]?\d{6,8}))$/,
      "Phone must be a valid mobile (10 digits) or landline number"
    ),

  sms_uid: yup
    .string()
    .required("SMS UID (Email) is required.")
    .email("Enter a valid email address.")
    .max(100, "SMS UID cannot exceed 100 characters."),

  sms_pwd: yup
    .string()
    .required("SMS Password is required.")
    .min(8, "Password must be at least 8 characters.")
    .max(200, "Password cannot exceed 200 characters."),

  cancel_mode: yup
    .number()
    .typeError("Cancel Mode must be a number.")
    .required("Cancel Mode is required.")
    .integer("Cancel Mode must be an integer.")
    .min(0, "Cancel Mode cannot be less than 0.")
    .max(255, "Cancel Mode cannot exceed 255."),
});


const defaultValues = {
  id: "",
  name: "",
  address: "",
  phone: "",
  sms_uid: "",
  sms_pwd: "",
  cancel_mode: 1,
};

export default function BankFormSheet({ bankId = null, onSubmit, isOpen, onOpen, onClose }) {
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  useEffect(() => {
    if (bankId) {
      getBankById(bankId).then(data => {
        reset(data);
        setIsEditing(true);
      });
    } else {
      reset(defaultValues);
      setIsEditing(false);
    }
  }, [bankId, reset]);

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
      title={isEditing ? "Edit Bank" : "Add New Bank"}
      saveLabel={isEditing ? "Save Changes" : "Save"}
      isOpen={isOpen}
      onOpen={onOpen}
      onSave={handleSubmit(handleSave)}
      onCancel={handleCancel}
    >
      <form id="bank-form" className=" space-y-4">
      

           <div className="flex flex-col">
            <Label htmlFor="times" >Bank ID</Label>
        <Input {...register("id")} placeholder="Bank ID"  disabled={isEditing} 
  className={isEditing ? "bg-gray-100 cursor-not-allowed" : "mt-2"} />
        {errors.id && <p className="text-red-500 text-sm">{errors.id.message}</p>}
        </div>
 <div className="flex flex-col">
   <Label htmlFor="times">Bank Name</Label>
        <Input {...register("name")} placeholder="Bank Name"  className="mt-2"/>
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
 <div className="flex flex-col">
   <Label htmlFor="times">Bank Address</Label>
        <textarea {...register("address")} placeholder="Bank Address" rows={3} className="w-full border rounded-md p-2 placeholder:text-[#7A7A73] placeholder:text-sm mt-2" />
        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
        </div>
 <div className="flex flex-col">
   <Label htmlFor="times">Bank Phone</Label>
        <Input {...register("phone")} placeholder="Bank Phone" className="mt-2" />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>
 <div className="flex flex-col">
   <Label htmlFor="times"> SMS User ID</Label>
        <Input {...register("sms_uid")} type="email" placeholder="m@example.com" className="mt-2" />
        {errors.sms_uid && <p className="text-red-500 text-sm">{errors.sms_uid.message}</p>}
        </div>
 <div className="flex flex-col">
   <Label htmlFor="times">SMS Password</Label>
        <Input type="password" {...register("sms_pwd")} placeholder="SMS Password" className="mt-2" />
        {errors.sms_pwd && <p className="text-red-500 text-sm">{errors.sms_pwd.message}</p>}
        </div>
 <div className="flex flex-col">
   <Label htmlFor="times">Cancel Mode</Label>
        <Input {...register("cancel_mode")} placeholder=" Cancel Mode" className="mt-2"/>
        {errors.cancel_mode && <p className="text-red-500 text-sm">{errors.cancel_mode.message}</p>}
        </div>
      </form>
    </UserSheet>
  );
}
