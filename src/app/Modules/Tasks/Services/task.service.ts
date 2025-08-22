import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Task } from '../Models/task.model';
import { GenericApiService } from '../../../Shared/Services/generic-api/generic-api.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$: Observable<Task[]> = this.tasksSubject.asObservable();

  constructor(private api: GenericApiService) {}

  loadTasks(projectId: number): void {
    if (this.tasksSubject.value.length > 0) return;

    this.api.get<Task[]>(`${this.apiUrl}?userId=${projectId}`).subscribe({
      next: (data) => this.tasksSubject.next(data),
      error: () => this.tasksSubject.next([]),
    });
  }

  createTask(task: Task): Observable<Task> {
    const tasks = this.tasksSubject.value;
    const newTask: Task = {
      ...task,
      id: tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
    };

    this.tasksSubject.next([...tasks, newTask]);
    return of(newTask);
  }

  updateTask(taskId: number, updated: Partial<Task>): Observable<Task> {
    const tasks = this.tasksSubject.value;
    const updatedTask = { ...updated, id: taskId } as Task;

    this.tasksSubject.next(
      tasks.map((t) => (t.id === taskId ? updatedTask : t))
    );

    return of(updatedTask);
  }

  deleteTask(taskId: number): Observable<void> {
    const tasks = this.tasksSubject.value;
    this.tasksSubject.next(tasks.filter((t) => t.id !== taskId));

    return of(void 0);
  }
}
