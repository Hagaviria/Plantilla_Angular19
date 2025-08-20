import { Routes } from '@angular/router';
import { LoginComponent } from './Modules/Login/Components/login/login.component';
import { ProjectHomeComponent } from './Modules/Projects/Components/project-home/project-home.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'projects', component: ProjectHomeComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
