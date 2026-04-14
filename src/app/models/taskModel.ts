export interface TaskModel {
  id: string;
  sessionId: string;
  title: string;
  completed: boolean;
  orderIndex: number;
  createdAt?: string;
}
