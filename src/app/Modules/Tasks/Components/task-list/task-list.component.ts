import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../Services/task.service';
import { ActivatedRoute, Router } from '@angular/router';

import { TaskCardComponent } from '../task-card/task-card.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  imports: [
    TaskCardComponent,
    ConfirmDialogModule,
    ButtonModule,
    CommonModule,
    AsyncPipe,
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  private readonly tasksService = inject(TaskService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  projectId!: number;
  tasks$ = this.tasksService.tasks$;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      this.router.navigate(['/projects']);
      return;
    }
    const parsed = Number(idParam);
    if (Number.isNaN(parsed)) {
      this.router.navigate(['/projects']);
      return;
    }
    this.projectId = parsed;
    this.loadTasks();
  }

  private loadTasks(): void {
    this.tasksService.loadTasks(this.projectId);
  }

  addTask(): void {}
  editTask(taskId: number): void {}
  deleteTask(taskId: number): void {}
}
