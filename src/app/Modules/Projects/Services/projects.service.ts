import { Injectable, signal } from '@angular/core';
import { Project } from '../Models/project';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/users';
  readonly projects = signal<Project[]>([]);
  readonly loading = signal<boolean>(false);

  constructor(private http: HttpClient) {}

  loadProjects() {
    this.loading.set(true);
    this.http
      .get<any[]>(this.apiUrl)
      .pipe(
        map((users) =>
          users.map((user) => ({
            id: user.id,
            title: user.name,
            description: user.company?.catchPhrase,
          }))
        )
      )
      .subscribe({
        next: (projects) => {
          this.projects.set(projects);
          this.loading.set(false);
        },
        error: () => {
          this.projects.set([]);
          this.loading.set(false);
        },
      });
  }
  createProjects(project: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project);
  }
  updateProjects(id: number, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/${id}`, project);
  }
}
