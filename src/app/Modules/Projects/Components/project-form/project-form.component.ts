import { Component, OnInit, inject } from '@angular/core';
import { FormFieldBase } from '../../../../Shared/Models/forms/form-field-base';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '../../Services/projects.service';
import { GenericFormComponent } from '../../../../Shared/Components/generic-form/generic-form.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { Validators } from '@angular/forms';
import {
  minLengthCustom,
  uniqueProjectNameValidator,
} from '../../../../Shared/Validators/validators';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [GenericFormComponent, ButtonModule, CardModule],
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css'],
})
export class ProjectFormComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly projectsService = inject(ProjectsService);
  private readonly messageService = inject(MessageService);

  isEdit = false;
  projectId?: number;
  formFields: FormFieldBase<any>[] = [];

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.projectId = idParam ? Number(idParam) : undefined;
    this.isEdit = !!this.projectId;

    if (this.isEdit) {
      this.loadProjectForEdit();
    } else {
      this.setDefaultFormFields();
    }
  }

  private loadProjectForEdit(): void {
    const project = this.projectsService
      .projects()
      .find((p) => p.id === this.projectId);

    if (project) {
      this.formFields = [
        new FormFieldBase({
          controlType: 'textbox',
          key: 'title',
          label: 'Title',
          value: project.title,
          required: true,
        }),
        new FormFieldBase({
          controlType: 'textarea',
          key: 'description',
          label: 'Description',
          value: project.description,
          required: true,
        }),
      ];
    }
  }

  private setDefaultFormFields(): void {
    this.formFields = [
      new FormFieldBase({
        controlType: 'textbox',
        key: 'title',
        label: 'Titulo',
        value: '',
        required: true,
        validators: [
          Validators.required,
          minLengthCustom(3),
          uniqueProjectNameValidator(this.projectsService),
        ],
      }),
      new FormFieldBase({
        controlType: 'textarea',
        key: 'description',
        label: 'Descripción',
        value: '',
        required: true,
      }),
    ];
  }

  goBack() {
    this.router.navigate(['/projects']);
  }

  onSubmit(formValues: any) {
    if (this.isEdit) {
      this.projectsService
        .updateProject(this.projectId!, formValues)
        .subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Proyecto actualizado',
            detail: 'El proyecto se actualizó correctamente',
          });
          this.router.navigate(['/projects']);
        });
    } else {
      this.projectsService.createProject(formValues).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Proyecto creado',
          detail: 'El proyecto se creó correctamente',
        });
        this.router.navigate(['/projects']);
      });
    }
  }
}
