import { Routes } from '@angular/router';
import { LoginComponent } from './Modules/Login/Components/login/login.component';
import { authGuard } from './Security/Guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'projects',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './Modules/Projects/Components/project-home/project-home.component'
          ).then((m) => m.ProjectHomeComponent),
      },
      {
        path: 'create',
        loadComponent: () =>
          import(
            './Modules/Projects/Components/project-form/project-form.component'
          ).then((m) => m.ProjectFormComponent),
      },
      {
        path: ':id/edit',
        loadComponent: () =>
          import(
            './Modules/Projects/Components/project-form/project-form.component'
          ).then((m) => m.ProjectFormComponent),
      },
      {
        path: ':id/tasks',
        loadComponent: () =>
          import(
            './Modules/Tasks/Components/task-list/task-list.component'
          ).then((m) => m.TaskListComponent),
      },
      {
        path: ':id/tasks/create',
        loadComponent: () =>
          import(
            './Modules/Tasks/Components/task-form/task-form.component'
          ).then((m) => m.TaskFormComponent),
      },
      {
        path: ':id/tasks/:taskId/edit',
        loadComponent: () =>
          import(
            './Modules/Tasks/Components/task-form/task-form.component'
          ).then((m) => m.TaskFormComponent),
      },
      {
        path: ':id/tasks/:taskId/delete',
        loadComponent: () =>
          import(
            './Modules/Tasks/Components/task-form/task-form.component'
          ).then((m) => m.TaskFormComponent),
      },
    ],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
