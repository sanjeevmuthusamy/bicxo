import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { BoardColumn, Task, TaskPriority, TaskStatus } from './models/task.model';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly statuses: TaskStatus[] = ['To Do', 'In Progress', 'Done'];
  protected readonly priorities: TaskPriority[] = ['Low', 'Medium', 'High'];
  protected readonly currentUserId = 'user-1';
  protected readonly columns = signal<BoardColumn[]>(this.buildColumns([]));
  protected readonly isLoading = signal(true);
  protected readonly isSaving = signal(false);
  protected readonly errorMessage = signal('');
  protected readonly taskForm;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly taskService: TaskService
  ) {
    this.taskForm = this.formBuilder.nonNullable.group({
      title: ['', [Validators.required, Validators.maxLength(120)]],
      description: ['', Validators.required],
      priority: ['Medium' as TaskPriority, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  protected createTask(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    this.isSaving.set(true);
    this.errorMessage.set('');

    this.taskService.createTask({
      ...this.taskForm.getRawValue(),
      status: 'To Do',
      assigneeId: this.currentUserId
    }).subscribe({
      next: () => {
        this.taskForm.reset({
          title: '',
          description: '',
          priority: 'Medium'
        });
        this.isSaving.set(false);
        this.loadTasks();
      },
      error: () => {
        this.errorMessage.set('Unable to create task. Please try again.');
        this.isSaving.set(false);
      }
    });
  }

  private loadTasks(): void {
    this.isLoading.set(true);

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
