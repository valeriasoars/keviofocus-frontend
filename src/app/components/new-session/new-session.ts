import { Component, EventEmitter, output, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SessionModel } from '../../models/sessionModel';

@Component({
  selector: 'app-new-session',
  imports: [FormsModule],
  templateUrl: './new-session.html',
  styleUrl: './new-session.css',
})
export class NewSession {
  newSession: SessionModel = { name: '', description: '', focusDurationMinutes: 25, breakDurationMinutes: 5, cycles: 4 };
  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<SessionModel>();

  createSession() {
    this.create.emit(this.newSession);
  }
}
