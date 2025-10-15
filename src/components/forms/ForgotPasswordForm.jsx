import { useState } from "react";
import { forgotPassword } from "@/apiservices/userApi";
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

export function ForgotPassword() {
  const navigate = useNavigate(); 
 const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotPassword(email); // call API service
      setMessage(res.message);
    } catch (err) {
      setMessage(err.message || "Error sending reset link");
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center">
    <Card className="w-full max-w-sm ">
      <CardHeader>
       
        <Button variant="link">Forgot Password</Button>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent>
         
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
           {message && <p className="text-red-500 mb-2">{message}</p>}
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
             Send Reset Link
          </Button>
         
        </CardFooter>
      </form>
    </Card>
    </div>
  );
}
