import { Component, EventEmitter, output, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SessionModel } from '../../models/sessionModel';
import { CreateSessionModel } from '../../models/createSessionModel';

@Component({
  selector: 'app-new-session',
  imports: [FormsModule],
  templateUrl: './new-session.html',
  styleUrl: './new-session.css',
})
export class NewSession {
  newSession: CreateSessionModel = { name: '', description: '', focusDurationMinutes: 25, breakDurationMinutes: 5, cycles: 4 };
  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<CreateSessionModel>();

  createSession() {
    this.create.emit(this.newSession);
  }
}
