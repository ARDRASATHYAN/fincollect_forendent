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
  code: yup.string().required("Code is required."),
  description: yup.string().required("Description is required."),
  times: yup.string().required("Times is required."),
  multiples: yup.string().required("Multiples is required."),
  Stmt_Req: yup.string(),
});

const defaultValues = {
  bid: "",
  code: "",
  description: "",
  times: 1,
  multiples: 0,
  Stmt_Req: 0,

};

export default function DepositCodeFormSheet({ agent = null, onSubmit, isOpen, onOpen, onClose }) {
  const [isEditing, setIsEditing] = useState(false);
  const [banks, setBanks] = useState([]);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const selectedBank = watch("bid");

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

  // Save handler
  const handleSave = (data) => {
    onSubmit?.(data);

    // Reset form fields except bank
    reset(
      {
        ...defaultValues,
        bid: selectedBank, // keep selected bank
      },
      { keepDefaultValues: true }
    );
  };

  const handleCancel = () => {
    reset(defaultValues);
    onClose?.();
  };

  return (
   <FormDrawer
      title={isEditing ? "Edit Deposit Code" : "Add New Deposit Code"}
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
          
        </div>

        {/* Code */}
        <div className="flex flex-col">
           <Controller
              name="code"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField {...field} label="Deposit Code" size="small" fullWidth error={!!error} helperText={error?.message} color="black"  disabled={isEditing} autoComplete="new-code" inputProps={{name: "code_field",autoCorrect: "off"}}/>
              )}
            />
         
        </div>

        {/* Description */}
        <div className="flex flex-col">
           <Controller
              name="description"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField {...field} label="Description" size="small" fullWidth error={!!error} helperText={error?.message} color="black" autoComplete="new-des" inputProps={{name: "des_field",autoCorrect: "off"}}/>
              )}
            />
         
        </div>

        {/* Times */}
        <div className="flex flex-col">
           <Controller
              name="times"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField {...field} label="Max no of transaction in a day" size="small" fullWidth error={!!error} helperText={error?.message} color="black" autoComplete="new-times" inputProps={{name: "times_field",autoCorrect: "off"}}/>
              )}
            />
         
        </div>

        {/* Multiples */}
        <div className="flex flex-col">
           <Controller
              name="multiples"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField {...field} label="Multiples" size="small" fullWidth error={!!error} helperText={error?.message} color="black" autoComplete="new-mul" inputProps={{name: "expiry_mul",autoCorrect: "off"}}/>
              )}
            />
        
        </div>

        {/* Stmt_Req */}
        <div className="flex flex-col">
           <Controller
              name="Stmt_Req"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField {...field} label="Statement Required" size="small" fullWidth error={!!error} helperText={error?.message} color="black" autoComplete="new-smt" inputProps={{name: "smt_field",autoCorrect: "off"}}/>
              )}
            />
       
        </div>
      </form>
    </Box>
    </FormDrawer>
  );
}
