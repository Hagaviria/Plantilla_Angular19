import { Routes } from '@angular/router';
import { LoginComponent } from './Modules/Login/Components/login/login.component';
import { ProjectHomeComponent } from './Modules/Projects/Components/project-home/project-home.component';
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
    ],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
