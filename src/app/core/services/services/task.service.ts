
import { Injectable } from '@angular/core';
import { Task } from '../../interfaces/task';

@Injectable({ providedIn: 'root' })
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