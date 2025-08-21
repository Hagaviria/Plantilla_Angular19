import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../Models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$: Observable<Task[]> = this.tasksSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadTasks(projectId: number): void {
    this.http.get<Task[]>(`${this.apiUrl}?userId=${projectId}`).subscribe({
      next: (data) => this.tasksSubject.next(data),
      error: () => this.tasksSubject.next([]),
    });
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${taskId}`);
  }
}
