"use client";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UserSheet from "../commen/FormSheet";
import { getBanks } from "@/apiservices/bankApi";

import FormDrawer from "../commen/FormDrawer";
import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from "@mui/material";


// ✅ Validation Schema
const validationSchema = yup.object().shape({
  bid: yup.string().required("Bank is required."),
  tname: yup.string().required("templatename is required."),
  tid: yup.string().required("id is required."),
  msg: yup.string().required("Times is required."),

});
const defaultValues = {
  bid: "",
  tname: "",
  tid: "",
  msg: "",
};


export default function SmsTemplateFormSheet({ agent = null, onSubmit, isOpen, onOpen, onClose }) {
  const [isEditing, setIsEditing] = useState(false);
  const [banks, setBanks] = useState([]);

  const { register, control, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({
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

    <FormDrawer
      title={isEditing ? "Edit SMS Template" : "Add New SMS Template"}
      saveLabel={isEditing ? "Save Changes" : "Save"}
      isOpen={isOpen}
      onClose={handleCancel}
      onSave={handleSubmit(handleSave)}
    >


      {/* Scrollable content */}
      <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
        <form className="space-y-4">
          {/* Bank */}
          <div>
            <FormControl fullWidth error={!!errors.bid} size="small" >
              <InputLabel id="bank-select-label" color="black">Bank Name</InputLabel>
              <Select
                labelId="bank-select-label"
                value={watch("bid") || ""}
                label="Bank Name"
                onChange={(e) => setValue("bid", e.target.value)} color="black"
                disabled={isEditing}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 200, // maximum height of dropdown
                      width: 250,     // width of dropdown
                    },
                  },
                }}
              >

                {banks.map((bank) => (
                  <MenuItem key={bank.id} value={bank.id} >
                    {bank.name}-({bank.id})
                  </MenuItem>
                ))}
              </Select>
              {errors.bid && <FormHelperText>{errors.bid.message}</FormHelperText>}
            </FormControl>




            {/* Template Name */}


            <FormControl fullWidth size="small" error={!!errors.tname} sx={{ mt: 2 }}>
              <InputLabel id="status-select-label" color="black">Template Name</InputLabel>
              <Select
                labelId="tname-select-label"
                value={watch("tname")}
                label="Template Name"
                onChange={(e) => setValue("tname", e.target.value)} color="black" disabled={isEditing}
              >
                <MenuItem value="OTP">OTP</MenuItem>
                <MenuItem value="PAY">PAY</MenuItem>
                <MenuItem value="REC">REC</MenuItem>
              </Select>
              {errors.tname && <FormHelperText>{errors.tname.message}</FormHelperText>}
            </FormControl>


          </div>


          {/* Template ID */}
          <div className="flex flex-col">
            <Controller
              name="tid"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField {...field} label="Template ID" size="small" fullWidth error={!!error} helperText={error?.message} color="black" autoComplete="new-id" inputProps={{name: "id_field",autoCorrect: "off"}}/>
              )}
            />

          </div>

          {/* Message */}
          <div className="flex flex-col">
            <Controller
              name="msg"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField {...field} label="Message" size="small" fullWidth error={!!error} helperText={error?.message} color="black" multiline rows={4} autoComplete="new-msg" inputProps={{name: "msg_field",autoCorrect: "off"}}/>
              )}
            />

          </div>

        </form>
      </Box>

    </FormDrawer>

  );
}
