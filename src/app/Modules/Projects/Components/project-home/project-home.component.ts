import { Component, inject, OnInit } from '@angular/core';
import { ProjectsService } from '../../Services/projects.service';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-home',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent, ButtonModule],
  templateUrl: './project-home.component.html',
  styleUrl: './project-home.component.css',
})
export class ProjectHomeComponent implements OnInit {
  private readonly projectsService = inject(ProjectsService);

  projects = this.projectsService.projects;
  loading = this.projectsService.loading;

  constructor(private router: Router) {}

  ngOnInit() {
    this.projectsService.loadProjects();
  }

  createNewProject() {
    this.router.navigate(['/projects', 'create']);
  }
}
