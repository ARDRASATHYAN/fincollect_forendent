"use client";

import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Label } from "../ui/label";
import FormDrawer from "../commen/FormDrawer";
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, InputLabel, MenuItem, Select, TextField } from "@mui/material";







export default function UserForm({ user = null, onSubmit, isOpen, onOpen, onClose }) {
  const [isEditing, setIsEditing] = useState(false);
  const validationSchema = yup.object().shape({
    id: yup.string().max(10),
    name: yup.string().required("Name is required").max(75),
    email: yup.string().required("Email is required").email("Invalid email").max(200),
    role: yup.string().required("Role is required").max(50),
    status: yup.boolean(),
    password: yup.string().when([], {
      is: () => !isEditing,
      then: (schema) =>
        schema.required("Password is required.").min(6, "Password must be at least 6 characters."),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

  const defaultValues = {
    id: "",
    name: "",
    email: "",
    role: "",
    status: true,
    password: "",
  };

  const { register, control, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm({
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
    <FormDrawer
      title={isEditing ? "Edit User" : "Add New user"}
      saveLabel={isEditing ? "Save Changes" : "Save"}
      isOpen={isOpen}
      onClose={handleCancel}
      onSave={handleSubmit(handleSave)}
    >
      <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
        <form id="user-form" className=" space-y-4">


          <div className="flex flex-col">
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField {...field} label="Name" size="small" fullWidth error={!!error} helperText={error?.message} color="black" />
              )}
            />

          </div>
          <div className="flex flex-col">
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField {...field} label="Email" size="small" fullWidth error={!!error} helperText={error?.message} color="black" />
              )}
            />


            <FormControl fullWidth size="small" error={!!errors.role} sx={{ mt: 2 }}>
              <InputLabel id="role-select-label" color="black">Role</InputLabel>
              <Select
                labelId="role-select-label"
                value={watch("role")}
                label="Role"
                onChange={(e) => setValue("role", e.target.value)} color="black"
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>

              </Select>
              {errors.role && <FormHelperText>{errors.role.message}</FormHelperText>}
            </FormControl>


          </div>
          <div className="flex flex-col">
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField {...field} label="Password" size="small" fullWidth error={!!error} helperText={error?.message} color="black" disabled={isEditing} />
              )}
            />

          </div>
          <FormGroup sx={{ mt: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={statusValue}
                  onChange={(e) => setValue("status", e.target.checked)}
                  sx={{
                    color: "black", // unchecked color
                    '&.Mui-checked': { color: "black" }, // checked color
                  }}
                />
              }
              label="Active"
            />
          </FormGroup>
        </form>
      </Box>
    </FormDrawer>
  );
}
