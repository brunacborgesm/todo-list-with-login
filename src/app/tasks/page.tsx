"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../../lib/api";
import { getToken } from "../../lib/auth";
import type { Task, TaskCreateDTO, TaskUpdateDTO } from "../../types/task";
import TaskForm from "../../components/Forms/TaskForm";
import TaskList from "@/components/TaskList";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();

  async function load() {
    setErr(null);
    try {
      const data = await api<Task[]>("/tasks", { method: "GET" });
      setTasks(data);
    } catch (e: any) {
      setErr(e?.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const t = getToken();
    if (!t) {
      router.push("/login");
      return;
    }
    load();
  }, []);

  async function handleCreate(payload: TaskCreateDTO) {
    setErr(null);
    const created = await api<Task>("/tasks", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    setTasks((prev) => [created, ...prev]);
  }

  async function handleUpdate(id: string, patch: TaskUpdateDTO) {
    const updated = await api<Task>(`/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify(patch),
    });
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  }

  async function handleDelete(id: string) {
    await api<{ ok: true }>(`/tasks/${id}`, { method: "DELETE" });
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="min-h-dvh bg-gray-800">
      <main className="mx-auto max-w-3xl px-4 py-8">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Tasks</h1>
          <button
            onClick={() => { localStorage.removeItem("token"); window.location.href = "/login"; }}
            className="rounded-md bg-slate-700 px-3 py-2 text-white text-sm hover:bg-slate-800"
          >
            Logout
          </button>
        </header>

        <section className="mb-6 rounded-xl bg-slate-200 p-6 shadow">
          <TaskForm onSave={handleCreate} />
        </section>

        <section className="rounded-xl bg-slate-200 p-6 shadow">
          {err && <p className="mb-3 text-sm text-red-600">{err}</p>}
          {loading ? (
            <p>Loading…</p>
          ) : tasks.length === 0 ? (
            <p className="text-slate-600">No tasks yet.</p>
          ) : (
            <TaskList
              tasks={tasks}
              onToggle={(task) =>
                handleUpdate(task.id, {
                  status: task.status === "DONE" ? "PENDING" : "DONE",
                })
              }
              onDelete={(task) => handleDelete(task.id)}
              onEdit={(task, patch) => handleUpdate(task.id, patch)}
            />
          )}
        </section>
      </main>
    </div>
  );
}
