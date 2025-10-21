"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UserSheet from "../commen/FormSheet";
import { getBanks } from "@/apiservices/bankApi";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";


// ✅ Validation Schema
const validationSchema = yup.object().shape({
    bid: yup.string().required("Bank is required."),
    tname: yup.string().required("templatename is required."),
    tid: yup.string().required("id is required."),
    msg: yup.string().required("Times is required."),

});
const defaultValues = {
bid:"",
    tname: "",
    tid: "",
    msg: "",
};


export default function SmsTemplateFormSheet({ agent = null, onSubmit, isOpen, onOpen, onClose }) {
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
    const normalized = {
      bid: agent.bid || agent.BID || "",
      tname: agent.tname || agent.TNAME || "",
      tid: agent.tid || agent.TID || "",
      msg: agent.msg || agent.MSG || "",
    };
    reset(normalized);
  } else {
    reset(defaultValues);
    setIsEditing(false);
  }
}, [agent, reset]);

   const handleSave = (data) => {
     onSubmit?.(data);
    reset({
    bid: watch("bid"), // keep current selected bank
    tname: "",
    tid: "",
    msg: "",
  });
    //  onClose?.();
   };
 
   const handleCancel = () => {
     reset(defaultValues);
     onClose?.();
   };
  return (
 
    <UserSheet
          title={isEditing ? "Edit SmsTemplate" : "Add New SmsTemplate"}
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
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select Bank" />
            </SelectTrigger>
            <SelectContent className="h-[200px]">
              {banks.map((bank) => (
                <SelectItem key={bank.id} value={bank.id}>
                  {bank.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.bid && <p className="text-red-500 text-sm">{errors.bid.message}</p>}
        </div>


  {/* Template Name */}
 <div className="flex flex-col">
  <Label htmlFor="tname">Template Name</Label>
  <Select
    value={watch("tname")}
    onValueChange={(val) => setValue("tname", val)}
    disabled={isEditing}
  >
    <SelectTrigger className="mt-2">
      <SelectValue placeholder="Select Sms Template Name" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="OTP">OTP</SelectItem>
      <SelectItem value="PAY">PAY</SelectItem>
       <SelectItem value="REC">REC</SelectItem>
    </SelectContent>
  </Select>
  {errors.tname && (
    <p className="text-red-500 text-sm mt-1">{errors.tname.message}</p>
  )}
</div>


  {/* Template ID */}
  <div className="flex flex-col">
    <Label htmlFor="tid">Template ID</Label>
    <Input
      id="tid"
      {...register("tid")}
      placeholder="Sms template ID"
      className="mt-2"
    />
    {errors.tid && (
      <p className="text-red-500 text-sm mt-1">{errors.tid.message}</p>
    )}
  </div>

  {/* Message */}
  <div className="flex flex-col">
  <Label htmlFor="msg">Message</Label>
  <textarea
    id="msg"
    {...register("msg")}
    placeholder="Enter message"
    className="mt-2 border border-gray-300 rounded p-2 resize-y focus:outline-none focus:ring-2 focus:ring-black"
    rows={4} // default number of visible lines
  />
  {errors.msg && (
    <p className="text-red-500 text-sm mt-1">{errors.msg.message}</p>
  )}
</div>

</form>


    </UserSheet>

  );
}
