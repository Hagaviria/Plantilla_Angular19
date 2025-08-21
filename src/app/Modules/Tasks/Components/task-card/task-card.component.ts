import { Component, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { Task } from '../../Models/task.model';
import { TagModule } from 'primeng/tag';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-card',
  imports: [CardModule, CheckboxModule, ButtonModule, TagModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
  @Input({ required: true }) task!: Task;
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
}
