import { IsIn, IsOptional, IsString } from "class-validator";
import { TASK_STATUS, type TaskStatus } from "./create-task.dto";

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsIn(TASK_STATUS)
  @IsOptional()
  status?: TaskStatus;
}
