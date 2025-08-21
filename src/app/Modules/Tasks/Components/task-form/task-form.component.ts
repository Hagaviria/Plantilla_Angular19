import { Component, OnInit, inject } from '@angular/core';
import { FormFieldBase } from '../../../../Shared/Models/forms/form-field-base';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../Services/task.service';
import { GenericFormComponent } from '../../../../Shared/Components/generic-form/generic-form.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [GenericFormComponent, ButtonModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly taskService = inject(TaskService);

  isEdit = false;
  taskId?: number;
  projectId?: number;
  formFields: FormFieldBase<any>[] = [];

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm(): void {
    const projectIdParam = this.route.snapshot.paramMap.get('projectId');
    this.projectId = projectIdParam ? Number(projectIdParam) : undefined;

    const taskIdParam = this.route.snapshot.paramMap.get('taskId');
    this.taskId = taskIdParam ? Number(taskIdParam) : undefined;
    this.isEdit = !!this.taskId;

    if (this.isEdit) {
      this.loadTaskForEdit();
    } else {
      this.setDefaultFormFields();
    }
  }

  private loadTaskForEdit(): void {
    this.taskService.tasks$.subscribe((tasks) => {
      const task = tasks.find((t) => t.id === this.taskId);
      if (task) {
        this.formFields = [
          new FormFieldBase({
            controlType: 'textbox',
            key: 'title',
            label: 'Title',
            value: task.title,
            required: true,
          }),
          new FormFieldBase({
            controlType: 'checkbox',
            key: 'completed',
            label: 'Completed',
            value: task.completed,
          }),
        ];
      }
    });
  }

  private setDefaultFormFields(): void {
    this.formFields = [
      new FormFieldBase({
        controlType: 'textbox',
        key: 'title',
        label: 'Title',
        value: '',
        required: true,
      }),
      new FormFieldBase({
        controlType: 'checkbox',
        key: 'completed',
        label: 'Completed',
        value: false,
      }),
    ];
  }

  onCancel() {
    this.router.navigate([`/projects/${this.projectId}/tasks`]);
  }

  onSubmit(formValues: any) {
    if (this.isEdit) {
      this.taskService
        .updateTask(this.taskId!, formValues)
        .subscribe(() =>
          this.router.navigate([`/projects/${this.projectId}/tasks`])
        );
    } else {
      this.taskService
        .createTask({ ...formValues, projectId: this.projectId! })
        .subscribe(() =>
          this.router.navigate([`/projects/${this.projectId}/tasks`])
        );
    }
  }
}
