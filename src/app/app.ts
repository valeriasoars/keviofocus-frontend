import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from "./components/sidebar/sidebar";
import { NewSession } from './components/new-session/new-session';
import { SessionView } from "./components/session-view/session-view";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, NewSession, SessionView],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('keviofocus-frontend');
}
