"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { loginUser } from "@/apiservices/userApi";
import { useNavigate } from "react-router-dom";
import useToast from "@/hooks/useToast";
import logo from "../../assets/fincollect.png";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// Yup validation schema
const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export function LoginForm() {
  const navigate = useNavigate();
  const { success, error: showError } = useToast();
  const [showPassword, setShowPassword] = useState(false);

const handleTogglePassword = () => setShowPassword((prev) => !prev);


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data);
      success("Login successfully");
      navigate("/bank");
    } catch (err) {
      showError(err || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader className="flex flex-col items-center">
          <img src={logo} alt="Fincollect" className="w-24 h-24 rounded-full border" />
          <h1 className="font-bold text-lg flex justify-center">Fincollect</h1>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" autoCorrect="off">
          <CardContent className="flex flex-col gap-3">
            <TextField
              label="Email"
              type="email"
              size="small"
              color="black"
              fullWidth
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

           <TextField
  label="Password"
  type={showPassword ? "text" : "password"}
  size="small"
  fullWidth
  color="black"
  {...register("password")}
  error={!!errors.password}
  helperText={errors.password?.message}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={handleTogglePassword} edge="end">
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    ),
  }}
/>


           
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
             <a
              href="/forgotpassword"
              className="text-sm hover:text-blue-800 flex justify-center"
            >
              Forgot your password?
            </a>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
