export interface SessionModel {
  id?: number;
  name: string;
  description: string;
  focusDurationMinutes: number;
  breakDurationMinutes: number;
  cycles: number;
}