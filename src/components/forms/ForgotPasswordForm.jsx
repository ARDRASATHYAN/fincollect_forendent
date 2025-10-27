"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { forgotPassword } from "@/apiservices/userApi";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";

// Yup validation schema
const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export function ForgotPassword() {
  const navigate = useNavigate();
  const [message, setMessage] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setMessage("");
    try {
      const res = await forgotPassword(data.email); // call API service
      setMessage(res.message || "Reset link sent successfully");
    } catch (err) {
      setMessage(err.message || "Error sending reset link");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader className="flex items-center justify-center">
          <h2 className="text-lg font-bold">Forgot Password</h2>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" autoCorrect="off">
          <CardContent className="flex flex-col gap-4">
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

            {message && <p className="text-red-500">{message}</p>}
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Reset Link"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
