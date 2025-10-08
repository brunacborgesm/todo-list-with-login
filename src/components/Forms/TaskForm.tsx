"use client";

import { useState, FormEvent } from "react";
import TextField from "../ui/TextField";
import SelectField from "../ui/SelectField";
import { TASK_STATUS_OPTIONS, type TaskCreateDTO, type TaskStatus } from "../../types/task";

export default function TaskForm({ onSave }: { onSave: (payload: TaskCreateDTO) => void | Promise<void> }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("PENDING");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) { setErr("Title is required"); return; }
    setErr(null); setLoading(true);
    try {
      await onSave({ title: title.trim(), description: description.trim() || undefined, status });
      setTitle(""); setDescription(""); setStatus("PENDING");
    } catch (e: any) {
      setErr(e?.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate>
      <TextField
        id="title" label="Title"
        value={title} onChange={(e) => setTitle(e.target.value)}
        placeholder="e.g. Study Nest"
      />
      <TextField
        id="description" label="Description"
        value={description} onChange={(e) => setDescription(e.target.value)}
        placeholder="optional"
      />
      <SelectField
        id="status" label="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value as TaskStatus)}
        options={TASK_STATUS_OPTIONS}
      />

      {err && <p className="text-sm text-red-600">{err}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-indigo-600 px-3 py-2 text-white font-medium hover:bg-indigo-700 disabled:opacity-60"
      >
        {loading ? "Saving..." : "Add task"}
      </button>
    </form>
  );
}
