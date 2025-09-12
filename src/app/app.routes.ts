import { Routes } from '@angular/router';
import { LoginComponent } from './Modules/Login/Components/login/login.component';
import { authGuard } from './Security/Guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
