"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import UserSheet from "../commen/FormSheet";
import { getBanks } from "@/apiservices/bankApi";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";


// ✅ Validation Schema
const validationSchema = yup.object().shape({
  bid: yup.string().required("Bank is required."),
  code: yup.string().required("Code is required."),
  description: yup.string().required("Description is required."),
  times: yup.string().required("Times is required."),
  multiples: yup.string().required("Multiples is required."),
  Stmt_req: yup.string().nullable(),
});

const defaultValues = {
   bid: "",
  code: "",
  description:"", 
  times: "",
  multiples:"", 
  Stmt_req: "",
};

export default function DepositCodeFormSheet({ agent = null, onSubmit, isOpen, onOpen, onClose }) {
 const [isEditing, setIsEditing] = useState(false);
   const [banks, setBanks] = useState([]);
 
   const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({
     resolver: yupResolver(validationSchema),
     defaultValues,
   });
 
   // Fetch banks
   useEffect(() => {
     getBanks().then(setBanks).catch(console.error);
   }, []);
 
   // Load agent for edit
   useEffect(() => {
     if (agent) {
       setIsEditing(true);
       reset(agent);
       if (agent.bid) setValue("bid", agent.bid);
     } else {
       reset(defaultValues);
       setIsEditing(false);
     }
   }, [agent, reset, setValue]);
 
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
          title={isEditing ? "Edit DepositCode" : "Add New DepositCode"}
          saveLabel={isEditing ? "Save Changes" : "Save"}
          isOpen={isOpen}
          onOpen={onOpen}
          onSave={handleSubmit(handleSave)}
          onCancel={handleCancel}
        >
   <form className="space-y-4">
  {/* Bank */}
  <div>
          <Label>Bank Name</Label>
          <Select value={watch("bid")} onValueChange={(val) => setValue("bid", val)} disabled={isEditing}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select bank"  />
            </SelectTrigger>
            <SelectContent className="h-[200px]">
              {banks.map((bank) => (
                <SelectItem key={bank.id} value={bank.id} >
                  {bank.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.bid && <p className="text-red-500 text-sm">{errors.bid.message}</p>}
        </div>

  {/* Code */}
  <div className="flex flex-col">
    <Label htmlFor="code">Deposit Code</Label>
    <Input
      id="code"
      {...register("code")}
      placeholder="Deposit Code"
      className="mt-2" disabled={isEditing}
    />
    {errors.code && (
      <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>
    )}
  </div>

  {/* Description */}
  <div className="flex flex-col">
    <Label htmlFor="description">Description</Label>
    <Input
      id="description"
      {...register("description")}
      placeholder="Enter Description"
     className="mt-2"
    />
    {errors.description && (
      <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
    )}
  </div>

  {/* Times */}
  <div className="flex flex-col">
    <Label htmlFor="times">Times</Label>
    <Input
      id="times"
      {...register("times")}
      placeholder="Enter Times"
     className="mt-2"
    />
    {errors.times && (
      <p className="text-red-500 text-sm mt-1">{errors.times.message}</p>
    )}
  </div>

  {/* Multiples */}
  <div className="flex flex-col">
    <Label htmlFor="multiples">Multiples</Label>
    <Input
      id="multiples"
      {...register("multiples")}
      placeholder="Enter Multiples"
      className="mt-2"
    />
    {errors.multiples && (
      <p className="text-red-500 text-sm mt-1">{errors.multiples.message}</p>
    )}
  </div>

  {/* Stmt_req (nullable) */}
  <div className="flex flex-col">
    <Label htmlFor="Stmt_req">Statement Required</Label>
    <Input
      id="Stmt_req"
      {...register("Stmt_req")}
      placeholder="Enter statement required"
     className="mt-2"
    />
    {errors.Stmt_req && (
      <p className="text-red-500 text-sm mt-1">{errors.Stmt_req.message}</p>
    )}
  </div>
</form>

    </UserSheet>

  );
}
