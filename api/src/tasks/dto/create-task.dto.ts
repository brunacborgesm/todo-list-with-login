import { IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";

export const TASK_STATUS = ["PENDING", "IN_PROGRESS", "DONE"] as const;
export type TaskStatus = typeof TASK_STATUS[number];

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsIn(TASK_STATUS)
  status!: TaskStatus;
}
