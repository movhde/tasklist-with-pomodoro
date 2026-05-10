// app/test-auth/page.tsx
"use client";

import { useState } from "react";
import axiosInstance from "@/lib/axios";

export default function TestAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");

  const handleSignup = async () => {
    try {
      const res = await axiosInstance.post("/api/auth/signup", {
        email,
        password,
      });
      setResult(JSON.stringify(res.data, null, 2));
      localStorage.setItem("token", res.data.token);
    } catch (error: any) {
      setResult(error.response?.data?.message || error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axiosInstance.post("/api/auth/login", {
        email,
        password,
      });
      setResult(JSON.stringify(res.data, null, 2));
      localStorage.setItem("token", res.data.token);
    } catch (error: any) {
      setResult(error.response?.data?.message || error.message);
    }
  };

  const handleGetMe = async () => {
    try {
      const res = await axiosInstance.get("/api/auth/me");
      setResult(JSON.stringify(res.data, null, 2));
    } catch (error: any) {
      setResult(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="p-8">
      <div className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2"
        />
        <div className="space-x-2">
          <button onClick={handleSignup} className="bg-blue-500 text-white p-2">
            Signup
          </button>
          <button onClick={handleLogin} className="bg-green-500 text-white p-2">
            Login
          </button>
          <button
            onClick={handleGetMe}
            className="bg-purple-500 text-white p-2"
          >
            Get Me
          </button>
        </div>
        <pre className="bg-gray-100 p-4 mt-4">{result}</pre>
      </div>
    </div>
  );
}
