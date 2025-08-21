import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { TagModule } from 'primeng/tag';
import { Task } from '../../Models/task.model';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CardModule, ButtonModule, CheckboxModule, TagModule],
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css'],
})
export class TaskCardComponent {
  @Input({ required: true }) task!: Task;
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  editTask() {
    this.edit.emit(this.task.id);
  }

  deleteTask() {
    this.delete.emit(this.task.id);
  }
}
