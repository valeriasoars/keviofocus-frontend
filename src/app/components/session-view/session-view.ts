import { Component } from '@angular/core';
import { SessionModel } from '../../models/sessionModel';
import { SessionRunModel } from '../../models/sessionRunModel';
import { Tasks } from "./tasks/tasks";
import { KevioService } from '../../services/kevio-service';

@Component({
  selector: 'app-session-view',
  imports: [Tasks],
  templateUrl: './session-view.html',
  styleUrl: './session-view.css',
})
export class SessionView {

  constructor(private service: KevioService){}
 

  get selectedSession() { return this.service.selectedSession(); }
  get view() { return this.service.view(); }
}
