import { Component } from '@angular/core';
import { Sidebar } from "./components/sidebar/sidebar";
import { SessionView } from "./components/session-view/session-view";

@Component({
  selector: 'app-root',
  imports: [ Sidebar,  SessionView],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
