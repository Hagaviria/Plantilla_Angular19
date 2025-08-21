import { Component, Input } from '@angular/core';
import { Card } from 'primeng/card';
import { Project } from '../../Models/project';
import { Button } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-card',
  imports: [Card, Button],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;

  constructor(private router: Router) {}

  goToTasks(projectId: number) {
    this.router.navigate(['/projects', projectId, 'tasks']);
  }
  editProject(projectId: number) {
    this.router.navigate(['/projects', projectId, 'edit']);
  }
  deleteProject(projectId: number) {}
}
