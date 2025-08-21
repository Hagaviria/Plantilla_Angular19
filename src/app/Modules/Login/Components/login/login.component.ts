import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { GenericFormComponent } from '../../../../Shared/Components/generic-form/generic-form.component';
import { FormFieldBase } from '../../../../Shared/Models/forms/form-field-base';
import { ButtonModule } from 'primeng/button';
import { LoginForm } from '../../Models/loginForm';
import { AuthService } from '../../../../Security/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    GenericFormComponent,
    ButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formFields: FormFieldBase<string>[] = [
    new FormFieldBase({
      key: 'user',
      label: 'Usuario',
      required: true,
      controlType: 'textbox',
      type: 'text',
    }),
    new FormFieldBase({
      key: 'password',
      label: 'Contraseña',
      required: true,
      controlType: 'textbox',
      type: 'password',
    }),
  ];
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  onFormSubmit(formData: Record<string, any>) {
    const loginForm: LoginForm = {
      user: (formData['user'] ?? '') as string,
      password: (formData['password'] ?? '') as string,
    };
    this.authService.login(loginForm.user, loginForm.password).subscribe({
      next: (success) => {
        console.log('Login successful:', success);
        if (success) {
          this.router.navigate(['/projects']);
        } else {
          console.warn('Credenciales inválidas');
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
      },
    });
  }
}
