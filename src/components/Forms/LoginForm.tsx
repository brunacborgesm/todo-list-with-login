"use client";

import React, { useState, FormEvent } from "react";
import { api } from "../../lib/api";
import { saveToken } from "../../lib/auth";
import type { AuthResponse } from "../../types/task";
import TextField from "../ui/TextField";
import { useRouter } from "next/navigation";


export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const data = await api<AuthResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      saveToken(data.accessToken);
      router.push("/tasks");
    } catch (error: any) {
      setErr(error?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <TextField
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Insert your email"
        autoComplete="email"
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Insert your password"
        autoComplete="current-password"
      />
      {err && <p className="text-sm text-red-600">{err}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-indigo-600 px-3 py-4 text-white font-medium hover:bg-indigo-700 disabled:opacity-60 cursor-pointer"
      >
        {loading ? "Loading..." : "Access To Do App"}
      </button>
    </form>
  );
}
