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
  mobile: yup.string().required("Mobile is required."),
  id: yup.string().required("ID is required."),
  name: yup.string().required("Name is required."),
  mname: yup.string().nullable(),
  status: yup.string().required("Status is required."),
  pwd: yup.string(),
  pin: yup.string(),
  pwd_expiry_days: yup.string(),
  pwdloginattempt: yup.string(),
  pinloginattempt: yup.string(),
  enabled: yup.boolean(),
  collection_status: yup.boolean(),
  print_required: yup.boolean(),
  sms_required: yup.boolean(),
});

const defaultValues = {
  branch: "",
  mobile: "",
  id: "",
  name: "",
  mname: "",
  status: "A",
  pwd: "WELCOME",
  pin: "123456",
  pwdloginattempt: "0",
  pinloginattempt: "0",
  pwd_expiry_days: "90",
  enabled: true,
  collection_status: true,
  print_required: false,
  sms_required: true,
};

export default function AgentFormSheet({ agent = null, onSubmit, isOpen, onOpen, onClose }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [banks, setBanks] = useState([]);

  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  // Fetch banks
  const fetchBanks = () => {
    getBanks().then(setBanks).catch(console.error);
  };

  useEffect(() => {
    fetchBanks();
  }, []);

  // Load agent for edit
  useEffect(() => {
    if (agent) {
      setIsEditing(true);
      const { pwd, pin, ...rest } = agent;

    reset({
      ...defaultValues,
      ...rest,
      pwd: "", // leave blank in edit mode
      pin: "", // leave blank in edit mode
    });
      setShowDetails(true);
      if (agent.bid) setValue("bid", agent.bid);
    } else {
      reset(defaultValues);
      setIsEditing(false);
      setShowDetails(false);
    }
  }, [agent, reset, setValue]);

   const editingAgent = agent;

  //  Ensure mname = name if empty before sending to backend
  const handleSave = async (data) => {
  try {
    // Ensure mname = name if empty
    if (!data.mname || data.mname.trim() === "") {
      data.mname = data.name;
    }

    // Only send pwd/pin if changed in edit mode
    if (isEditing && editingAgent) {
      if (data.pwd === editingAgent.pwd) delete data.pwd;
      if (data.pin === editingAgent.pin) delete data.pin;
    }

    await onSubmit?.(data);

    const currentBank = watch("bid");
    reset({ ...defaultValues, bid: currentBank });

    if (!isEditing) setShowDetails(false);
  } catch (err) {
    console.error("Failed to save agent:", err);
  }
};


  const handleCancel = () => {
    reset(defaultValues);
    if (!isEditing) setShowDetails(false);
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
          <Input {...register("id")} placeholder="Enter ID" disabled={isEditing} />
          {errors.id && <p className="text-red-500 text-sm">{errors.id.message}</p>}
        </div>

        <div>
          <Label>Name</Label>
          <Input {...register("name")} placeholder="Enter name" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <Label>Name in Malayalam</Label>
          <Input {...register("mname")} placeholder="Name in Malayalam" />
        </div>

        <div>
          <Label>Mobile</Label>
          <Input {...register("mobile")} placeholder="Enter mobile" />
          {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}
        </div>

        {!isEditing && (
          <button
            type="button"
            className="text-blue-600 hover:underline text-sm"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? "Hide Details" : "Show More Details"}
          </button>
        )}

        {showDetails && (
          <>
            <div className="flex flex-col">
              <Label>Status</Label>
              <Select value={watch("status")} onValueChange={(val) => setValue("status", val)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">Active</SelectItem>
                  <SelectItem value="I">Inactive</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
            </div>

            <div>
              <Label>Password</Label>
              <Input type="text" {...register("pwd")} placeholder="Enter password" />
            </div>

            <div>
              <Label>PIN</Label>
              <Input type="text" {...register("pin")} placeholder="Enter PIN" />
            </div>

            <div>
              <Label>Password expiry days</Label>
              <Input type="text" {...register("pwd_expiry_days")} placeholder="Enter password expiry days" />
            </div>

            <div>
              <Label>Pin Login Attempt</Label>
              <Input type="text" {...register("pinloginattempt")} placeholder="Enter pin login attempt" />
            </div>

            <div>
              <Label>Password Login Attempt</Label>
              <Input type="text" {...register("pwdloginattempt")} placeholder="Enter password login attempt" />
            </div>

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
          </>
        )}
      </form>
    </UserSheet>
  );
}
