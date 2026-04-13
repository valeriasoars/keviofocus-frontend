import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from "./components/sidebar/sidebar";
import { NewSession } from './components/new-session/new-session';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, NewSession],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('keviofocus-frontend');
}
