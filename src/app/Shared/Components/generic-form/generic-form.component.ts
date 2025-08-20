import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormFieldBase } from '../../Models/forms/form-field-base';
import { FormControlService } from '../../Services/form-control/form-control.service';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from '../form-field/form-field/form-field.component';

@Component({
  selector: 'app-generic-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormFieldComponent],
  templateUrl: './generic-form.component.html',
  styleUrls: ['./generic-form.component.css'],
})
export class GenericFormComponent implements OnInit {
  @Input() formFields: FormFieldBase<any>[] = [];
  @Output() formSubmit = new EventEmitter<Record<string, any>>();

  formGroup!: FormGroup;

  constructor(private readonly formControlService: FormControlService) {}

  ngOnInit() {
    this.formGroup = this.formControlService.toFormGroup(this.formFields);
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.formSubmit.emit(this.formGroup.value);
    }
  }
}
