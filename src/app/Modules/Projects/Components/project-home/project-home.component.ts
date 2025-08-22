import { Component, effect, inject, OnInit } from '@angular/core';
import { ProjectsService } from '../../Services/projects.service';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { AuthService } from '../../../../Security/Services/auth.service';
import { MessageService } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-project-home',
  standalone: true,
  imports: [
    CommonModule,
    ProjectCardComponent,
    ButtonModule,
    PaginatorModule,
    ConfirmDialogModule,
  ],
  templateUrl: './project-home.component.html',
  styleUrls: ['./project-home.component.css'],
})
export class ProjectHomeComponent implements OnInit {
  private readonly projectsService = inject(ProjectsService);
  private readonly authService = inject(AuthService);
  private readonly messageService = inject(MessageService);

  projects = this.projectsService.projects;
  loading = this.projectsService.loading;

  paginatedProjects: any[] = [];
  first = 0;
  rows = 9;

  constructor(private readonly router: Router) {
    effect(() => {
      this.updatePaginatedProjects();
    });
  }

  ngOnInit() {
    if (this.projects().length === 0) {
      this.projectsService.loadProjects();
    }
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.updatePaginatedProjects();
  }

  private updatePaginatedProjects() {
    this.paginatedProjects = this.projects().slice(
      this.first,
      this.first + this.rows
    );
  }

  createNewProject() {
    this.router.navigate(['/projects', 'create']);
  }

  logout() {
    this.authService.logout();
    this.messageService.add({
      severity: 'info',
      summary: 'Sesión cerrada',
      detail: 'Has salido de la aplicación',
    });
    this.router.navigate(['/login']);
  }
}
