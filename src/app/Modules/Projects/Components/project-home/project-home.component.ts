import { Component, inject, OnInit } from '@angular/core';
import { ProjectsService } from '../../Services/projects.service';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { AuthService } from '../../../../Security/Services/auth.service';

@Component({
  selector: 'app-project-home',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent, ButtonModule],
  templateUrl: './project-home.component.html',
  styleUrls: ['./project-home.component.css'],
})
export class ProjectHomeComponent implements OnInit {
  private readonly projectsService = inject(ProjectsService);
  private readonly authService = inject(AuthService);

  projects = this.projectsService.projects;
  loading = this.projectsService.loading;

  constructor(private readonly router: Router) {}

  ngOnInit() {
    if (this.projects().length === 0) {
      this.projectsService.loadProjects();
    }
  }

  createNewProject() {
    this.router.navigate(['/projects', 'create']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
