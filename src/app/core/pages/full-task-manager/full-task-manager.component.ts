import { Component } from '@angular/core';
import { ParentTaskInputComponent } from "../parent-task-input/parent-task-input.component";
import { TaskManagerComponent } from "../task-manager/task-manager.component";

@Component({
  selector: 'app-full-task-manager',
  standalone: true,
  imports: [ParentTaskInputComponent, TaskManagerComponent],
  templateUrl: './full-task-manager.component.html',
  styleUrl: './full-task-manager.component.css'
})
export class FullTaskManagerComponent {

}
