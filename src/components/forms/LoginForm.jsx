"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "@/apiservices/userApi";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const data = await loginUser({ email, password });
    console.log("Login successful", data);

    // Navigate to bank page
    navigate("/bank");
  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  }
};



  return (
    <div className="min-h-screen flex items-center justify-center">
    <Card className="w-full max-w-sm ">
      <CardHeader>
       
        <Button variant="link">Sign In</Button>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="/forgotpassword"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Login
          </Button>
         
        </CardFooter>
      </form>
    </Card>
    </div>
  );
}
