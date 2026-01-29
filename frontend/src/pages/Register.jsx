import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Register() {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const nav = useNavigate();

  const handleRegister = async () => {
    await api.post("/register",{name,email,password});
    nav("/");
  };

  return (
    <AuthLayout title="Create Account" subtitle="Start your journey">
      <Input placeholder="Name" onChange={e=>setName(e.target.value)} />
      <Input placeholder="Email" onChange={e=>setEmail(e.target.value)} />
      <Input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
      <Button color="green" onClick={handleRegister}>Register</Button>
    </AuthLayout>
  );
}
