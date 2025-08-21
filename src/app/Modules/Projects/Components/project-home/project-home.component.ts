import { Component, inject, OnInit } from '@angular/core';
import { ProjectsService } from '../../Services/projects.service';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../project-card/project-card.component';

@Component({
  selector: 'app-project-home',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './project-home.component.html',
  styleUrl: './project-home.component.css',
})
export class ProjectHomeComponent implements OnInit {
  private readonly projectsService = inject(ProjectsService);

  projects = this.projectsService.projects;
  loading = this.projectsService.loading;

  ngOnInit() {
    this.projectsService.loadProjects();
  }
}
