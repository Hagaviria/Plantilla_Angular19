import { Component, Input, inject } from '@angular/core';
import { Card } from 'primeng/card';
import { Project } from '../../Models/project';
import { Button } from 'primeng/button';
import { Router } from '@angular/router';
import { ProjectsService } from '../../Services/projects.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-project-card',
  imports: [Card, Button, ConfirmDialogModule],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;
  private readonly router = inject(Router);
  private readonly projectsService = inject(ProjectsService);
  private readonly messageService = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);

  goToTasks(projectId: number) {
    this.router.navigate(['/projects', projectId, 'tasks']);
  }
  editProject(projectId: number) {
    this.router.navigate(['/projects', projectId, 'edit']);
  }
  deleteProject(projectId: number) {
    this.confirmationService.confirm({
      message: '¿Eliminar este proyecto?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.projectsService.deleteProject(projectId).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Proyecto eliminado',
            detail: 'El proyecto se eliminó correctamente',
          });
        });
      },
    });
  }
}
