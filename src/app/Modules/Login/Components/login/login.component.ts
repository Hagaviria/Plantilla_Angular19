import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { GenericFormComponent } from '../../../../Shared/Components/generic-form/generic-form.component';
import { FormFieldBase } from '../../../../Shared/Models/forms/form-field-base';
import { ButtonModule } from 'primeng/button';

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
  formFields: FormFieldBase<any>[] = [
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
  onFormSubmit(formData: any) {
    console.log('Form submitted:', formData);
  }
}
