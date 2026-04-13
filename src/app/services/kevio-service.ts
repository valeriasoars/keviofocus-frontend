import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SessionModel } from '../models/sessionModel';


@Injectable({
  providedIn: 'root',
})
export class KevioService {
  private apiUrl = 'https://localhost:7157/api';

  sessions = signal<SessionModel[]>([]);

  constructor(private http: HttpClient) {}

  getSessions() {
    return this.http.get<SessionModel[]>(`${this.apiUrl}/Session`);
  }

  createSession(session: any) {
    return this.http.post<SessionModel>(`${this.apiUrl}/Session`, session);
  }
}
