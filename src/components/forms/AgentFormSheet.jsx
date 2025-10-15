"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import UserSheet from "../commen/FormSheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { getBanks } from "@/apiservices/bankApi";

// Validation schema
const validationSchema = yup.object().shape({
  bid: yup.string().required("Bank is required."),
  branch: yup.string().required("Branch is required."),

  // Mobile validation: 10-digit mobile or landline
  mobile: yup
    .string()
    .required("Mobile is required.")
    .matches(
      /^(\d{10}|(\d{2,4}[- ]?\d{6,8}))$/,
      "Mobile must be a valid 10-digit mobile or landline number"
    ),

  id: yup.string().required("ID is required."),
  name: yup.string().required("Name is required."),
  mname: yup.string().nullable(),
  status: yup.string().required("status is required."),

  pwd: yup.string().required("Password is required."),
  pin: yup.string().required("PIN is required."),

  pwd_expiry_days: yup
    .number()
    .typeError("pwd_expiry_days must be a number.")
    .required("pwd_expiry_days is required."),
   

  pwdloginattempt: yup
    .number()
    .typeError("pwdloginattempt must be a number.")
    .required("pwdloginattempt is required."),


  pinloginattempt: yup
    .number()
    .typeError("pinloginattempt must be a number.")
    .required("pinloginattempt is required."),


  enabled: yup.boolean(),
  collection_status: yup.boolean(),
  print_required: yup.boolean(),
  sms_required: yup.boolean(),
});


const defaultValues = {
  bid: "",
  branch: "",
  mobile: "",
  id: "",
  name: "",
  mname: "",
  status: "",
  pwd: "",
  pin: "",
  pwdloginattempt:"",
  pinloginattempt:"",
  pwd_expiry_days:"",
  enabled: false,
  collection_status: false,
  print_required: false,
  sms_required: false,
};

export default function AgentFormSheet({ agent = null, onSubmit, isOpen, onOpen, onClose }) {
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
      title={isEditing ? "Edit Agent" : "Add New Agent"}
      saveLabel={isEditing ? "Save Changes" : "Save"}
      isOpen={isOpen}
      onOpen={onOpen}
      onSave={handleSubmit(handleSave)}
      onCancel={handleCancel}
    >
      <form className="space-y-4">
        {/* Bank Dropdown */}
        <div>
          <Label>Bank</Label>
          <Select value={watch("bid")} onValueChange={(val) => setValue("bid", val)} disabled={isEditing}>
            <SelectTrigger>
              <SelectValue placeholder="Select bank" />
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

        <div>
          <Label>Branch</Label>
          <Input {...register("branch")} placeholder="Enter branch" />
          {errors.branch && <p className="text-red-500 text-sm">{errors.branch.message}</p>}
        </div>

       

        <div>
          <Label>ID</Label>
          <Input {...register("id")} placeholder="Enter ID"  disabled={isEditing}/>
          {errors.id && <p className="text-red-500 text-sm">{errors.id.message}</p>}
        </div>

        <div>
          <Label>Name</Label>
          <Input {...register("name")} placeholder="Enter name" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <Label>Middle Name</Label>
          <Input {...register("mname")} placeholder="Enter middle name" />
        </div>


        <div>
          <Label>Mobile</Label>
          <Input {...register("mobile")} placeholder="Enter mobile" />
          {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}
        </div>


<div className="flex flex-col">
  <Label htmlFor="status">status</Label>
  <Select
    value={watch("status")}
    onValueChange={(val) => setValue("status", val)}
   
  >
    <SelectTrigger className="mt-2">
      <SelectValue placeholder="Select status" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="A">Active</SelectItem>
      <SelectItem value="I">InActive </SelectItem>
      
    </SelectContent>
  </Select>
  {errors.status && (
    <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
  )}
</div>

        
         {/* <div>
          <Label>Status</Label>
          <Input {...register("status")} placeholder="Enter status" />
        </div> */}

        <div>
          <Label>Password</Label>
          <Input type="password" {...register("pwd")} placeholder="Enter password" />
          {errors.pwd && <p className="text-red-500 text-sm">{errors.pwd.message}</p>}
        </div>

        <div>
          <Label>PIN</Label>
          <Input type="password" {...register("pin")} placeholder="Enter PIN" />
          {errors.pin && <p className="text-red-500 text-sm">{errors.pin.message}</p>}
        </div>


         <div>
          <Label>Password expiry days</Label>
          <Input type="text" {...register("pwd_expiry_days")} placeholder="Enter PIN" />
          {errors.pwd_expiry_days && <p className="text-red-500 text-sm">{errors.pwd_expiry_days.message}</p>}
        </div>
         <div>
          <Label>Pin Login Atempt</Label>
          <Input type="text" {...register("pinloginattempt")} placeholder="Enter pinloginattempt" />
          {errors.pinloginattempt && <p className="text-red-500 text-sm">{errors.pinloginattempt.message}</p>}
        </div>
         <div>
          <Label>Password Login Atempt</Label>
          <Input type="text" {...register("pwdloginattempt")} placeholder="Enter pwdloginattempt" />
          {errors.pwdloginattempt && <p className="text-red-500 text-sm">{errors.pwdloginattempt.message}</p>}
        </div>

        {/* Toggles */}
        <div className="flex items-center justify-between">
          <Label>Enabled</Label>
          <Switch checked={watch("enabled")} onCheckedChange={(val) => setValue("enabled", val)} />
        </div>

        <div className="flex items-center justify-between">
          <Label>SMS Required</Label>
          <Switch checked={watch("sms_required")} onCheckedChange={(val) => setValue("sms_required", val)} />
        </div>

        <div className="flex items-center justify-between">
          <Label>Print Required</Label>
          <Switch checked={watch("print_required")} onCheckedChange={(val) => setValue("print_required", val)} />
        </div>

        <div className="flex items-center justify-between">
          <Label>Collection Status</Label>
          <Switch checked={watch("collection_status")} onCheckedChange={(val) => setValue("collection_status", val)} />
        </div>
      </form>
    </UserSheet>
  );
}
