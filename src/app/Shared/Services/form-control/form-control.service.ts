import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormFieldBase } from '../../Models/forms/form-field-base';
@Injectable({
  providedIn: 'root',
})
export class FormControlService {
  toFormGroup(fields: FormFieldBase<string>[]) {
    const group: any = {};
    fields.forEach((f) => {
      group[f.key] = new FormControl(
        f.value || '',
        f.required ? Validators.required : null
      );
    });
    return new FormGroup(group);
  }

  constructor() {}
}
