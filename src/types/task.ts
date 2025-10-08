export type TaskStatus = "PENDING" | "IN_PROGRESS" | "DONE";
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export interface TaskCreateDTO {
  title: string;
  description?: string;
  status: TaskStatus;
}

export interface TaskUpdateDTO {
  title?: string;
  description?: string;
  status?: TaskStatus;
}
export interface AuthResponse {
  accessToken: string;
}
export const TASK_STATUS_OPTIONS: Array<{ value: TaskStatus; label: string }> = [
  { value: "PENDING",     label: "Pending" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "DONE",        label: "Done" },
];
