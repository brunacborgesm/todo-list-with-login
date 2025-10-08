import { Task } from "../types/task";

type Props = {
  tasks: Task[];
  onToggle: (task: Task) => void | Promise<void>;
  onDelete: (task: Task) => void | Promise<void>;
  onEdit?: (task: Task, patch: Partial<Pick<Task, "title" | "description" | "status">>) => void | Promise<void>;
};

export default function TaskList({ tasks, onToggle, onDelete }: Props) {
  return (
    <ul className="divide-y divide-slate-300">
      {tasks.map((t) => (
        <li key={t.id} className="py-3 flex items-start justify-between gap-4">
          <div>
            <p className="font-medium">{t.title}</p>
            {t.description && <p className="text-sm text-slate-600">{t.description}</p>}
            <p className="mt-1 inline-block rounded bg-slate-300 px-2 py-0.5 text-xs">{t.status}</p>
          </div>
          <div className="flex gap-2">
            <button
              className="rounded-md bg-emerald-600 px-3 py-2 text-white text-sm hover:bg-emerald-700"
              onClick={() => onToggle(t)}
            >
              {t.status === "DONE" ? "Mark pending" : "Mark done"}
            </button>
            <button
              className="rounded-md bg-rose-600 px-3 py-2 text-white text-sm hover:bg-rose-700"
              onClick={() => onDelete(t)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
