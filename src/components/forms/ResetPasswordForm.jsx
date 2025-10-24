"use client";

import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "@/apiservices/userApi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { TextField } from "@mui/material";

// Yup validation schema
const schema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function ResetPassword() {
  const { token } = useParams();
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
      const res = await resetPassword(token, data.password);
      setMessage(res.message || "Password reset successfully");
      navigate("/"); // Redirect after reset
    } catch (err) {
      setMessage(err.message || "Error resetting password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader className="flex items-center justify-center">
          <h2 className="text-lg font-bold ">Reset Password</h2>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="flex flex-col gap-4">
            <TextField
              label="New Password"
              type="password"
              size="small"
              fullWidth
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            {message && <p className="text-red-500">{message}</p>}
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
