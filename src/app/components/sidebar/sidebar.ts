import { Component, signal } from '@angular/core';
import { KevioService } from '../../services/kevio-service';
import { FormsModule } from '@angular/forms';
import { NewSession } from '../new-session/new-session';
import { SessionModel } from '../../models/sessionModel';

@Component({
  selector: 'app-sidebar',
  imports: [FormsModule, NewSession],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  selectedSession: SessionModel  | null = null;
  view: 'empty' | 'session' | 'create' = 'empty';

  private toastTimer: any;
  toast = signal<string>('');

  constructor(private service: KevioService) {}

  sessions: any;
  ngOnInit() {
    this.sessions = this.service.sessions;
    this.loadSessions();
  }

  loadSessions() {
    this.service.getSessions().subscribe((data) => {
      this.service.sessions.set(data);
    });
  }

  handleCreate(session: any) {
    this.service.createSession(session).subscribe((newSession) => {
      this.service.sessions.update((old) => [...old, newSession]);
      this.view = 'empty';
    });
  }

  showCreateForm() {
    this.view = 'create';
    this.selectedSession = null;
  }

  showToast(msg: string) {
    this.toast.set(msg);
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toast.set(''), 2800);
  }
}
