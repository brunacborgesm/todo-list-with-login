"use client";

import { useState, FormEvent } from "react";
import TextField from "../ui/TextField";
import { api } from "../../lib/api";
import { saveToken } from "../../lib/auth";
import type { AuthResponse } from "../../types/task";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [name, setName] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErr(null);

    if (!email.trim()) return setErr("Email is required");
    if (!password.trim()) return setErr("Password is required");

    setLoading(true);
    try {
      await api<{ ok: boolean; user: { id: string; email: string } }>("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
          name: name.trim() || undefined,
        }),
      });

      const login = await api<AuthResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      });

      saveToken(login.accessToken);
      router.push("/tasks");
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <TextField
        id="name"
        label="Name (optional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        autoComplete="name"
      />
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
        placeholder="Create a password"
        autoComplete="new-password"
      />

      {err && <p className="text-sm text-red-600">{err}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-indigo-600 px-3 py-2 text-white font-medium hover:bg-indigo-700 disabled:opacity-60"
      >
        {loading ? "Creating..." : "Sign up"}
      </button>
    </form>
  );
}
