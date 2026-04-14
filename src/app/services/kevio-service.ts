import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SessionModel } from '../models/sessionModel';
import { TaskModel } from '../models/taskModel';
import { CreateTaskModel } from '../models/createTaskModel';
import { CreateSessionModel } from '../models/createSessionModel';

@Injectable({
  providedIn: 'root',
})
export class KevioService {
  private apiUrl = 'https://localhost:7157/api';

  sessions = signal<SessionModel[]>([]);
  selectedSession = signal<SessionModel | null>(null);
  view = signal<'empty' | 'session' | 'create'>('empty');

  constructor(private http: HttpClient) {}

  getSessions() {
    return this.http.get<SessionModel[]>(`${this.apiUrl}/Session`);
  }

  getSessionById(id: string) {
    return this.http.get<SessionModel>(`${this.apiUrl}/Session/${id}`);
  }

  createSession(session: CreateSessionModel) {
    return this.http.post<SessionModel>(`${this.apiUrl}/Session`, session);
  }

  createTask(task: CreateTaskModel) {
    return this.http.post<CreateTaskModel>(`${this.apiUrl}/Task`, task);
  }

  toggleTask(taskId: string) {
    return this.http.patch<TaskModel>(`${this.apiUrl}/Task/${taskId}/toggle`, {});
  }

  deleteTask(taskId: string) {
    return this.http.delete(`${this.apiUrl}/Task/${taskId}`);
  }

  completeTask(taskId: string, sessionRunId: string) {
    return this.http.post(`${this.apiUrl}/TaskCompletions`, { taskId, sessionRunId });
  }

  startRun(dto: { sessionId: string }) {
    return this.http.post<any>(`${this.apiUrl}/SessionRuns`, dto);
  }

  updateMetrics(id: string, focusSeconds: number, breakSeconds: number) {
    return this.http.patch(
      `${this.apiUrl}/SessionRuns/${id}/update-metrics?status=1&focusSeconds=${focusSeconds}&breakSeconds=${breakSeconds}`,
      {},
    );
  }

  finishRun(id: string) {
    return this.http.patch(`${this.apiUrl}/SessionRuns/${id}/finish`, {});
  }
}
