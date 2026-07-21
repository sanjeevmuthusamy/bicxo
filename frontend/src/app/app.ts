import { Component, OnInit, signal } from '@angular/core';

import { BoardColumn, Task, TaskStatus } from './models/task.model';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly statuses: TaskStatus[] = ['To Do', 'In Progress', 'Done'];
  protected readonly columns = signal<BoardColumn[]>(this.buildColumns([]));
  protected readonly isLoading = signal(true);
  protected readonly errorMessage = signal('');

  constructor(private readonly taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  private loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.columns.set(this.buildColumns(tasks));
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Unable to load tasks. Please make sure the backend is running.');
        this.isLoading.set(false);
      }
    });
  }

  private buildColumns(tasks: Task[]): BoardColumn[] {
    return this.statuses.map((status) => ({
      title: status,
      tasks: tasks.filter((task) => task.status === status)
    }));
  }
}
