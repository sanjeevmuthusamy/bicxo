import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly apiUrl = 'http://localhost:3000/api/tasks';

  constructor(private readonly http: HttpClient) {}

  getTasks(assigneeId?: string): Observable<Task[]> {
    const url = assigneeId ? `${this.apiUrl}?assigneeId=${assigneeId}` : this.apiUrl;
    return this.http.get<Task[]>(url);
  }
}
