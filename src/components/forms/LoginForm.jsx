"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "@/apiservices/userApi";
import { useNavigate } from "react-router-dom";
import useToast from "@/hooks/useToast";
import logo from "../../assets/fincollect.png";

export function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { success, error: showError } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // start loading
    try {
      const data = await loginUser({ email, password });
      console.log("Login successful", data);
      success("Login successfully");
      navigate("/bank");
    } catch (err) {
      showError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader className="flex flex-col items-center ">
          <img src={logo} alt="" className="w-24 h-24 rounded-full border" />
          <h1 className="font-bold text-lg items-center flex justify-center">Fincollect</h1>

        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="flex flex-col gap-2">
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
              <a
                href="/forgotpassword"
                className=" text-sm  hover:text-blue-800 flex items-center justify-center"
              >
                Forgot your password?
              </a>
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
