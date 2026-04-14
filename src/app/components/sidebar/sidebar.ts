import { Component, signal } from '@angular/core';
import { KevioService } from '../../services/kevio-service';
import { FormsModule } from '@angular/forms';
import { NewSession } from '../new-session/new-session';
import { SessionModel } from '../../models/sessionModel';
import { CreateSessionModel } from '../../models/createSessionModel';

@Component({
  selector: 'app-sidebar',
  imports: [FormsModule, NewSession],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private toastTimer: any
  toast = signal('')

  get sessions() {
    return this.service.sessions
  }
  get view() {
    return this.service.view
  }

  setView(v: 'empty' | 'session' | 'create') {
  this.service.view.set(v);
}

  get selectedSessionId() { return this.service.selectedSession()?.id; }

  constructor(private service: KevioService) {}

  ngOnInit() {
    this.loadSessions()
  }

  loadSessions() {
    this.service.getSessions().subscribe((data) => {
      this.service.sessions.set(data)
    })
  }

  selectSession(session: SessionModel) {
    this.service.getSessionById(session.id).subscribe((full) => {
      this.service.selectedSession.set(full)
      this.service.view.set('session')
    })
  }

  handleCreate(session: CreateSessionModel) {
    this.service.createSession(session).subscribe((newSession) => {
      this.service.sessions.update((old) => [...old, { ...newSession, tasks: [] }])
      this.service.view.set('empty')
    })
  }

  showCreateForm() {
    this.service.view.set('create')
    this.service.selectedSession.set(null)
  }

  showToast(msg: string) {
    this.toast.set(msg)
    clearTimeout(this.toastTimer)
    this.toastTimer = setTimeout(() => this.toast.set(''), 2800)
  }
}
