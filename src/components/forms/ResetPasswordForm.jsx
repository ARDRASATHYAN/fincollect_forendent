import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "@/apiservices/userApi";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await resetPassword(token, password);
      navigate("/")
      setMessage(res.message);
    } catch (err) {
      setMessage(err.message || "Error resetting password");
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
          {message && <p className="text-red-500 mb-2">{message}</p>}
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Password</Label>
              <Input
                id="email"
                type="password"
                 placeholder="New Password"
               value={password}
          onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
           Reset Password
          </Button>
         
        </CardFooter>
      </form>
    </Card>
    </div>

   
  );
}
