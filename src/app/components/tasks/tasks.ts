import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task';
import { Task } from '../../models/task.model';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from '../tasks-form/tasks-form';
import { TasksItemComponent } from '../tasks-item/tasks-item';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.html',
  imports: [CommonModule, TaskFormComponent, TasksItemComponent, ReactiveFormsModule],
  styleUrl: './tasks.scss',
  standalone: true,
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  editingTask?: Task;
  showForm: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  /**
   * Cargar las tareas desde el servicio
   */
  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  /**
   * Editar una tarea
   * @param task Tarea a editar
   */
  editTask(task: Task): void {
    this.editingTask = { ...task };
    this.showForm = true;
  }

  /**
   * Eliminar una tarea
   * @param id tarea a eliminar
   */
  deleteTask(id: number): void {
    if (confirm('¿Eliminar esta tarea?')) {
      this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
    }
  }

  /**
   * Agregar una nueva tarea
   */
  addTask(): void {
    this.editingTask = undefined;
    this.showForm = true;
  }

  /**
   * Cerrar el formulario de tareas
   */
  onFormClose(): void {
    this.showForm = false;
    this.loadTasks();
  }
}
