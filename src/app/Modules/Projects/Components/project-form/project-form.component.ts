import { Component } from '@angular/core';
import { FormFieldBase } from '../../../../Shared/Models/forms/form-field-base';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '../../Services/projects.service';
import { GenericFormComponent } from '../../../../Shared/Components/generic-form/generic-form.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-project-form',
  imports: [GenericFormComponent, ButtonModule],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css',
})
export class ProjectFormComponent {
  isEdit = false;
  projectId?: number;
  formFields: FormFieldBase<any>[] = [
    new FormFieldBase({
      controlType: 'textbox',
      key: 'title',
      label: 'Title',
      value: '',
      required: true,
    }),
    new FormFieldBase({
      controlType: 'textarea',
      key: 'description',
      label: 'Description',
      value: '',
      required: true,
    }),
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectsService
  ) {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEdit = !!this.projectId;
  }
  onCancel() {
    this.router.navigate(['/projects']);
  }

  onSubmit(formValues: any) {
    if (this.isEdit) {
      this.projectService
        .updateProjects(this.projectId!, formValues)
        .subscribe(() => {
          this.router.navigate(['/projects']);
        });
    } else {
      this.projectService.createProjects(formValues).subscribe(() => {
        this.router.navigate(['/projects']);
      });
    }
  }
}
