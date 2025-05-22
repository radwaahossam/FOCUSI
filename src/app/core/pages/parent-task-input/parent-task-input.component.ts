
import { Component } from '@angular/core';
import { Task } from '../../interfaces/task';
import { TaskService } from '../../services/services/task.service';
import { FormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-parent-task-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './parent-task-input.component.html',
  styleUrl: './parent-task-input.component.css'
})

export class ParentTaskInputComponent {
  taskName = '';
  taskTime: string = '';

  constructor(private taskService: TaskService) {}

  addTask() {
    if (!this.taskName || !this.taskTime) return;

    const newTask: Task = {
      id: uuidv4(),
      name: this.taskName,
      time: this.taskTime,
      isActive: true,
      isCompleted: false
    };

    this.taskService.addTask(newTask);
    this.taskName = '';
    this.taskTime = '';
  }
}
