
// import { Component } from '@angular/core';
// import { Task } from '../../interfaces/task';
// import { TaskService } from '../../services/services/task.service';
// import { FormsModule } from '@angular/forms';
// import { v4 as uuidv4 } from 'uuid';


// @Component({
//   selector: 'app-parent-task-input',
//   standalone: true,
//   imports: [FormsModule],
//   templateUrl: './parent-task-input.component.html',
//   styleUrl: './parent-task-input.component.css'
// })

// export class ParentTaskInputComponent {
//   taskName = '';
//   taskTime: string = '';

//   constructor(private taskService: TaskService) {}

//   addTask() {
//     if (!this.taskName || !this.taskTime) return;

//     const newTask: Task = {
//       id: uuidv4(),
//       name: this.taskName,
//       time: this.taskTime,
//       isActive: true,
//       isCompleted: false
//     };

//     this.taskService.addTask(newTask);
//     this.taskName = '';
//     this.taskTime = '';
//   }
// }



import { Component } from '@angular/core';
import { Task } from '../../interfaces/task';
import { TaskService } from '../../services/services/task.service';
import { FormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { CommonModule } from '@angular/common';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@Component({
  selector: 'app-parent-task-input',
  standalone: true,
  imports: [FormsModule, CommonModule, NgxMaterialTimepickerModule],
  templateUrl: './parent-task-input.component.html',
  styleUrls: ['./parent-task-input.component.css']
})
export class ParentTaskInputComponent {
  taskName = '';
  taskTime: string = '';
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {
    this.getTasks(); // تحميل المهام عند البداية
  }

 getTasks() {
  this.taskService.getTasks().subscribe({
    next: (data) => {
      console.log('Response data:', data); // شوفي شكل الداتا
      this.tasks = data;
    },
    error: (err) => {
      console.error('Failed to load tasks', err);
    }
  });
}


addTask() {
  if (!this.taskName || !this.taskTime) return;

  // تحويل الوقت إلى تاريخ ISO 8601 مع الوقت المحدد (مثلاً اليوم مع الوقت المدخل)
  // نفترض taskTime شكلها 'hh:mm AM/PM' ونحولها لتاريخ كامل
  const dateWithTimeISO = this.convertToISODate(this.taskTime);

  const newTask = {
    name: this.taskName,
    date: dateWithTimeISO,
    isDateAndTimeEnded: false,  // حسب الحالة (يمكن تغييرها)
    isCompleted: false
  };

  this.taskService.addTask(newTask).subscribe({
    next: () => {
      this.getTasks();
      this.taskName = '';
      this.taskTime = '';
    },
    error: (err) => {
      console.error('Add task failed', err);
    }
  });
}

// دالة مساعدة لتحويل الوقت إلى ISO date
convertToISODate(time12h: string): string {
  const now = new Date();
  const [time, modifier] = time12h.split(' ');

  let [hours, minutes] = time.split(':').map(Number);

  if (modifier.toLowerCase() === 'pm' && hours !== 12) {
    hours += 12;
  } else if (modifier.toLowerCase() === 'am' && hours === 12) {
    hours = 0;
  }

  now.setHours(hours, minutes, 0, 0);
  return now.toISOString();
}



  deleteTask(task: Task) {
  this.taskService.deleteTask(task.name).subscribe({
    next: () => this.getTasks(),
    error: (err) => console.error('Delete failed', err)
  });
}


  // toggleActive(task: Task) {
  //   task.isActive = !task.isActive;
  //   this.taskService.updateTask(task).subscribe({
  //     next: () => this.getTasks(),
  //     error: (err) => console.error('Toggle failed', err)
  //   });
  // }

  editTask(task: Task) {
    this.taskName = task.name;
    this.taskTime = task.date;
    this.deleteTask(task); 
  }
}
