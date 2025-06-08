
import { Component, OnInit } from '@angular/core';
import { Task } from '../../interfaces/task';
import { TaskService } from '../../services/services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})

export class TaskManagerComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.requestNotificationPermission();
    this.tasks = this.taskService.getTasks();
    this.checkNotifications();
    setInterval(() => this.checkNotifications(), 60000);
  }
  requestNotificationPermission() {
    if (Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log('Notification permission granted');
        } else {
          console.warn('Notification permission denied or dismissed');
        }
      });
    }
  }

  checkNotifications() {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5); 
    this.tasks.forEach(task => {
      if (task.isActive && !task.isCompleted && task.time === currentTime) {
        this.showNotification(task);
      }
    });
  }

  showNotification(task: Task) {
    const audio = new Audio('assets/sounds/notification.mp3');
    audio.play().catch(error => console.warn('Audio error:', error));
  
    if (Notification.permission === 'granted') {
      new Notification(`Time for: ${task.name}`);
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification(`Time for: ${task.name}`);
        }
      });
    }
  }
  
  toggleActive(task: Task) {
    this.taskService.toggleTaskActive(task.id);
  }

  toggleComplete(task: Task) {
    this.taskService.toggleTaskCompletion(task.id);
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id);
    this.tasks = this.taskService.getTasks();
  }

  editTask(task: Task) {
    const newName = prompt('Edit task name:', task.name);
    const newTime = prompt('Edit task time (HH:mm):', task.time);
    if (newName && newTime) {
      const updated = { ...task, name: newName, time: newTime };
      this.taskService.updateTask(updated);
      this.tasks = this.taskService.getTasks();
    }
  }

}


// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Task } from '../../interfaces/task';
// import { TaskService } from '../../services/services/task.service';

// @Component({
//   selector: 'app-task-manager',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './task-manager.component.html',
//   styleUrl: './task-manager.component.css'
// })
// export class TaskManagerComponent implements OnInit {
//   tasks: Task[] = [];

//   constructor(private taskService: TaskService) {}

//   ngOnInit(): void {
//     this.loadTasks();
//   }

//   loadTasks() {
//     this.taskService.getTasks().subscribe({
//   next: (data) => {
//     console.log('Received data:', data);
//     this.tasks = data;
//   },
//   error: (err) => {
//     console.error('Failed to load tasks', err);
//   }
// });

//   }

//   editTask(task: Task) {
//     // من الأفضل استخدام EventEmitter لربط التعديل بين الكومبوننتين
//     alert('ربط التعديل يتم من parent-task-input');
//   }

//   deleteTask(task: Task) {
//     this.taskService.deleteTask(task.name).subscribe(() => {
//       this.tasks = this.tasks.filter(t => t.name !== task.name);
//     });
//   }

//   toggleActive(task: Task) {
//     // task.isActive = !task.isActive;
//     this.taskService.updateTask(task).subscribe();
//   }
// }