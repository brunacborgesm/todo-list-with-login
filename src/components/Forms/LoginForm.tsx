"use client";

import { useState, FormEvent } from "react";
import TextField from "../ui/TextField";
import { api } from "../../lib/api";
import { saveToken } from "../../lib/auth";
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
    if (!email.trim()) return setErr("Email is required");
    if (!password.trim()) return setErr("Password is required");

    setLoading(true);
    try {
      const data = await api<{ accessToken: string }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      });
      saveToken(data.accessToken);
      router.push("/tasks");
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <TextField id="email" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField id="password" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {err && <p className="text-sm text-red-600">{err}</p>}
      <button disabled={loading} className="w-full rounded-md bg-indigo-600 px-3 py-2 text-white">
        {loading ? "Signing in..." : "Login"}
      </button>
    </form>
  );
}
