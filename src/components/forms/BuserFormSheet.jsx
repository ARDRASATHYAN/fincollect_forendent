"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Drawer, Box, Typography, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText, Switch as MuiSwitch } from "@mui/material";
import { getBanks } from "@/apiservices/bankApi";
import FormDrawer from "../commen/FormDrawer";
import IOSSwitch from "../commen/IOSSwitch";

// Validation schema
const validationSchema = yup.object().shape({
  bid: yup.string().required("Bank is required."),
  mobile: yup.string().required("Mobile is required."),
  name: yup.string().required("Name is required."),
  status: yup.string().required("Status is required."),
  pwd: yup.string(),
  pin: yup.string(),
  pwd_expiry_days: yup.string(),
  pwdloginattempt: yup.string(),
  pinloginattempt: yup.string(),
  enabled: yup.boolean(),
});

const defaultValues = {
  
  mobile: "",

  name: "",
 
  status: "A",
  pwd: "WELCOME",
  pin: "123456",
  pwdloginattempt: "0",
  pinloginattempt: "0",
  pwd_expiry_days: "90",
  enabled: true,
  last_login_date:"02/02/2000",
  pwd_changed_date:"02/02/2000",
 
};

export default function BuserFormDrawer({ agent = null, onSubmit, isOpen, onOpen, onClose }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [banks, setBanks] = useState([]);

  const { control, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({
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
      const { pwd, pin, ...rest } = agent;
      reset({
        ...defaultValues,
        ...rest,
        pwd: "",
        pin: "",
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

  const handleSave = async (data) => {
    try {
      if (!data.mname || data.mname.trim() === "") data.mname = data.name;

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
    <FormDrawer
      title={isEditing ? "Edit Agent" : "Add New Agent"}
      saveLabel={isEditing ? "Save Changes" : "Save"}
      isOpen={isOpen}
      onClose={handleCancel}
      onSave={handleSubmit(handleSave)}
    >


      {/* Scrollable content */}
      <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
        <form className="space-y-4">
          {/* Bank Select */}
          <FormControl fullWidth error={!!errors.bid} size="small" >
            <InputLabel id="bank-select-label" color="black">Bank</InputLabel>
            <Select
              labelId="bank-select-label"
              value={watch("bid") || ""}
              label="Bank"
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

          {/* Branch */}
        

          
          {/* Name */}
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField {...field} label="Name" size="small" fullWidth error={!!error} helperText={error?.message} color="black" autoComplete="new-name" inputProps={{name: "agent_name_field",autoCorrect: "off"}}/>
            )}
          />

        

          {/* Mobile */}
          <Controller
            name="mobile"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField {...field} label="Mobile" size="small" fullWidth error={!!error} helperText={error?.message} color="black" autoComplete="new-phone" inputProps={{name: "agent_phone_field",autoCorrect: "off"}}/>
            )}
          />

          {!isEditing && (
            <Button variant="text" onClick={() => setShowDetails(!showDetails)}  sx={{ color: "black", fontFamily: "Inter, sans-serif" }}>
              {showDetails ? "Hide Details" : "Show More Details"}
            </Button>
          )}

          {showDetails && (
            <>
              {/* Status */}
              <FormControl fullWidth size="small" error={!!errors.status} sx={{ mt: 2 }}>
                <InputLabel id="status-select-label" color="black">Status</InputLabel>
                <Select
                  labelId="status-select-label"
                  value={watch("status")}
                  label="Status"
                  onChange={(e) => setValue("status", e.target.value)} color="black"
                >
                  <MenuItem value="A">Active</MenuItem>
                  <MenuItem value="I">Inactive</MenuItem>
                </Select>
                {errors.status && <FormHelperText>{errors.status.message}</FormHelperText>}
              </FormControl>

              {/* Password */}
              <Controller
                name="pwd"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField {...field} label="Password" size="small" fullWidth error={!!error} helperText={error?.message} color="black" autoComplete="new-pwd" inputProps={{name: "pwd_field",autoCorrect: "off"}}/>
                )}
              />

              {/* PIN */}
              <Controller
                name="pin"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField {...field} label="PIN" size="small" fullWidth error={!!error} helperText={error?.message} color="black" autoComplete="new-pin" inputProps={{name: "pin_field",autoCorrect: "off"}}/>
                )}
              />

              {/* Password expiry days */}
              <Controller
                name="pwd_expiry_days"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField {...field} label="Password expiry days" size="small" fullWidth error={!!error} helperText={error?.message} color="black" autoComplete="new-expiry" inputProps={{name: "expiry_field",autoCorrect: "off"}} />
                )}
              />

              {/* Login attempts */}
              <Controller
                name="pinloginattempt"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField {...field} label="PIN Login Attempt" size="small" fullWidth error={!!error} helperText={error?.message} color="black" autoComplete="new-login" inputProps={{name: "login_field",autoCorrect: "off"}} />
                )}
              />
              <Controller
                name="pwdloginattempt"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField {...field} label="Password Login Attempt" size="small" fullWidth error={!!error} helperText={error?.message} color="black" autoComplete="new-attempt" inputProps={{name: "attempt_field",autoCorrect: "off"}} />
                )}
              />
               <Controller
                name="last_login_date"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField {...field} label="last login date" size="small" fullWidth error={!!error} helperText={error?.message} color="black" autoComplete="new-log" inputProps={{name: "last_field",autoCorrect: "off"}} />
                )}
              />
              <Controller
                name="pwd_changed_date"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField {...field} label="pwd changed date" size="small" fullWidth error={!!error} helperText={error?.message} color="black" autoComplete="new-pwd" inputProps={{name: "pwd_field",autoCorrect: "off"}} />
                )}
              />

              {/* Switches */}
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                <Typography>Enabled</Typography>
                <IOSSwitch checked={watch("enabled")} onChange={(e) => setValue("enabled", e.target.checked)}  />
              </Box>
              
            </>
          )}
        </form>
      </Box>

      {/* Footer */}

    </FormDrawer>
  );
}
