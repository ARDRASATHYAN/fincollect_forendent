"use client";

import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "../ui/input";
import { getBankById } from "@/apiservices/bankApi";
import UserSheet from "../commen/FormSheet";
import { Label } from "../ui/label";
import FormDrawer from "../commen/FormDrawer";
import { Box, TextField } from "@mui/material";


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
    .min(6, "Password must be at least 6 characters.")
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
  const { register, control, handleSubmit, reset, formState: { errors } } = useForm({
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
    <FormDrawer
      title={isEditing ? "Edit Bank" : "Add New Bank"}
      saveLabel={isEditing ? "Save Changes" : "Save"}
      isOpen={isOpen}
      onClose={handleCancel}
      onSave={handleSubmit(handleSave)}
    >
      <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
        <form id="bank-form" className=" space-y-4">


          <div className="flex flex-col">
            <Controller
              name="id"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField {...field} label="Bank ID" size="small" fullWidth error={!!error} helperText={error?.message} color="black"  disabled={isEditing} autoComplete="new-id" inputProps={{name: "bank_id_field",autoCorrect: "off"}}/>
              )}
            />
           
          </div>
          <div className="flex flex-col">
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField {...field} label="Bank Name" size="small" fullWidth error={!!error} helperText={error?.message} color="black" autoComplete="new-name" inputProps={{name: "bank_name_field",autoCorrect: "off"}}/>
              )}
            />
           
          </div>
          <div className="flex flex-col">
            <Controller
              name="address"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField {...field} label="Bank Address" size="small" fullWidth error={!!error} helperText={error?.message} color="black" multiline rows={4} autoComplete="new-address" inputProps={{name: "bank_address_field",autoCorrect: "off"}}/>
              )}
            />
          
          </div>
          <div className="flex flex-col">
            <Controller
              name="phone"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField {...field} label="Bank Phone" size="small" fullWidth error={!!error} helperText={error?.message} color="black" autoComplete="new-phone" inputProps={{name: "bank_phone_field",autoCorrect: "off"}}/>
              )}
            />
           
          </div>
          <div className="flex flex-col">
            <Controller
              name="sms_uid"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField {...field} label="SMS User ID" type="email" size="small" fullWidth error={!!error} helperText={error?.message} color="black" autoComplete="new-uid" inputProps={{name: "bank_uid_field",autoCorrect: "off"}} />
              )}
            />
           
          </div>
          <div className="flex flex-col">
            <Controller
              name="sms_pwd"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField {...field} label="SMS Password" size="small" fullWidth error={!!error} helperText={error?.message} color="black" autoComplete="new-pwd" inputProps={{name: "bank_pwd_field",autoCorrect: "off"}}/>
              )}
            />
           
          </div>
          <div className="flex flex-col">
            <Controller
              name="cancel_mode"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField {...field} label="Cancel Mode" size="small" fullWidth error={!!error} helperText={error?.message} color="black" autoComplete="new-cancel" inputProps={{name: "bank_cancel_field",autoCorrect: "off"}}/>
              )}
            />
           
          </div>
        </form>
      </Box>
    </FormDrawer>
  );
}
