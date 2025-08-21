import { Injectable, signal } from '@angular/core';
import { Project } from '../Models/project';
import { HttpClient } from '@angular/common/http';
import { map, Observable, finalize, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/users';
  readonly projects = signal<Project[]>([]);
  readonly loading = signal<boolean>(false);

  constructor(private http: HttpClient) {}

  loadProjects(): void {
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
        ),
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: (projects) => this.projects.set(projects),
        error: () => this.projects.set([]),
      });
  }

  createProject(project: Project) {
    const currentProjects = this.projects();
    const maxId =
      currentProjects.length > 0
        ? Math.max(...currentProjects.map((p) => p.id))
        : 0;
    const newProject = { ...project, id: maxId + 1 };

    this.projects.update((projects) => [...projects, newProject]);

    return of(newProject);
  }

  updateProject(id: number, project: Project) {
    const updatedProject = { ...project, id };
    this.projects.update((projects) =>
      projects.map((p) => (p.id === id ? updatedProject : p))
    );
    return of(updatedProject);
  }

  deleteProject(id: number) {
    this.projects.update((projects) => projects.filter((p) => p.id !== id));
    return of(void 0);
  }
}
