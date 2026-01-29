import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Login() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const nav = useNavigate();

  const handleLogin = async () => {
    const res = await api.post("/login",{email,password});
    localStorage.setItem("token",res.data.token);
    nav("/profile");
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Login to your account">
      <Input placeholder="Email" onChange={e=>setEmail(e.target.value)} />
      <Input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
      <Button onClick={handleLogin}>Login</Button>
      <p className="mt-4 text-sm text-gray-400">
        New here? <span className="text-blue-400 cursor-pointer" onClick={()=>nav("/register")}>Register</span>
      </p>
    </AuthLayout>
  );
}
