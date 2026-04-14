import { Component, Input } from '@angular/core';
import { KevioService } from '../../../services/kevio-service';
import { TaskModel } from '../../../models/taskModel';
import { FormsModule } from '@angular/forms';
import { SessionModel } from '../../../models/sessionModel';

@Component({
  selector: 'app-tasks',
  imports: [FormsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {
  @Input() session!: SessionModel;

  newTaskTitle = '';

  constructor(private service: KevioService) {}

  addTask() {
    if (!this.newTaskTitle.trim()) return;
    if (!this.session.id) return;

    const task = {
      sessionId: String(this.session.id),
      title: this.newTaskTitle,
      orderIndex: this.session.tasks.length,
    };

    this.service.createTask(task).subscribe((newTask: any) => {
      this.session.tasks.push(newTask);
      this.newTaskTitle = '';
    });
  }

  completeTask(taskId: string) {
    this.service.toggleTask(taskId).subscribe((updated: TaskModel) => {
      const task = this.session.tasks.find((t: TaskModel) => t.id === taskId);
      if (task) task.completed = updated.completed;
    });
  }

  deleteTask(taskId: string) {
    this.service.deleteTask(taskId).subscribe(() => {
      this.session.tasks = this.session.tasks.filter((t: TaskModel) => t.id !== taskId);
    });
  }

  get totalTasks() {
    return this.session?.tasks?.length || 0;
  }

  get completedTasks() {
    return this.session?.tasks?.filter((t) => t.completed).length || 0;
  }

  onTaskKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') this.addTask();
  }
}
