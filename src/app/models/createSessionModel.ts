import { TaskModel } from "./taskModel";

export interface CreateSessionModel {
 name: string;
  description?: string;
  focusDurationMinutes: number;
  breakDurationMinutes: number;
  cycles: number;
}