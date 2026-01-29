import { useEffect, useState } from "react";
import api from "../api";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user,setUser]=useState({});
  const nav = useNavigate();

  useEffect(()=>{
    api.get("/profile").then(res=>setUser(res.data));
  },[]);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-10">
      <div className="max-w-xl mx-auto bg-gray-900 p-8 rounded-xl shadow-xl">
        <h1 className="text-2xl mb-4">Dashboard</h1>
        <p className="text-gray-400">Name: {user.name}</p>
        <p className="text-gray-400">Email: {user.email}</p>
        <div className="mt-6">
          <Button color="red" onClick={()=>{
            localStorage.removeItem("token");
            nav("/");
          }}>Logout</Button>
        </div>
      </div>
    </div>
  );
}
