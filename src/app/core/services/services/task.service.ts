
import { Injectable } from '@angular/core';
import { Task } from '../../interfaces/task';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private tasks: Task[] = [];

  constructor() {
    const saved = localStorage.getItem('tasks');
    if (saved) this.tasks = JSON.parse(saved);
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(task: Task) {
    this.tasks.push(task);
    this.save();
  }

  updateTask(updatedTask: Task) {
    const index = this.tasks.findIndex(t => t.id === updatedTask.id);
    if (index > -1) {
      this.tasks[index] = updatedTask;
      this.save();
    }
  }
  deleteTask(id: string) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.save();
  }
  toggleTaskCompletion(id: string) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.isCompleted = !task.isCompleted;
      this.save();
    }
  }
  toggleTaskActive(id: string) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.isActive = !task.isActive;
      this.save();
    }
  }
  private save() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}








// @Injectable({
//   providedIn: 'root'
// })
// export class TaskService {
//   private apiUrl = 'https://focusi.runasp.net/api/DailyRoutine';

//   constructor(private http: HttpClient) {}

//   private getToken(): string {
//     if (typeof window !== 'undefined') {
//       return localStorage.getItem('token') || '';
//     }
//     return '';
//   }

//   getHttpOptions() {
//   const token = localStorage.getItem('token') || '';
//   return {
//     headers: new HttpHeaders({
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     })
//   };
// }


//   addTask(task: Task): Observable<any> {
//     return this.http.post(`${this.apiUrl}/addtask`, task, this.getHttpOptions());
//   }

// getTasks(): Observable<Task[]> {
//   return this.http.get<{ data: Task[] }>(`${this.apiUrl}/taskManager`, this.getHttpOptions())
//     .pipe(map(response => response.data));
// }

//   deleteTask(name: string): Observable<any> {
//   return this.http.delete(`${this.apiUrl}/delete?name=${encodeURIComponent(name)}`, this.getHttpOptions());
// }

//   updateTask(task: Task): Observable<any> {
//     return this.http.put(`${this.apiUrl}/update`, task, this.getHttpOptions());
//   }
// }
