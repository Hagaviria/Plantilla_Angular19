import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../Services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../Models/task.model';

import { TaskCardComponent } from '../task-card/task-card.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-task-list',
  standalone: true,
  providers: [ConfirmationService, MessageService],
  imports: [
    TaskCardComponent,
    ConfirmDialogModule,
    ButtonModule,
    CommonModule,
    ToastModule,
    PaginatorModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  private readonly tasksService = inject(TaskService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);

  projectId!: number;

  tasks: Task[] = [];
  paginatedTasks: Task[] = [];

  first = 0;
  rows = 10;

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
    this.tasksService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
      this.updatePaginatedTasks();
    });
  }

  private updatePaginatedTasks(): void {
    this.paginatedTasks = this.tasks.slice(this.first, this.first + this.rows);
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
    this.updatePaginatedTasks();
  }

  addTask(): void {
    this.router.navigate(['/projects', this.projectId, 'tasks', 'create']);
  }

  editTask(taskId: number): void {
    this.router.navigate([
      '/projects',
      this.projectId,
      'tasks',
      taskId,
      'edit',
    ]);
  }

  deleteTask(taskId: number): void {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar esta tarea?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.tasksService.deleteTask(taskId).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Eliminada',
            detail: 'La tarea fue eliminada correctamente',
          });
        });
      },
    });
  }

  backToProjects(): void {
    this.router.navigate(['/projects']);
  }
}
