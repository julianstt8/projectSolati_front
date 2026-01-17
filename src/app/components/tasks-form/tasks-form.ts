import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task';

@Component({
  selector: 'app-tasks-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tasks-form.html',
  styleUrl: './tasks-form.scss',
  standalone: true,
})
export class TaskFormComponent {
  @Input() task?: Task;
  @Output() close = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: [false],
    });
  }

  ngOnChanges(): void {
    if (this.task) {
      this.form.patchValue(this.task);
    } else {
      this.form.reset({ status: false });
    }
  }

  submit(): void {
    if (this.form.invalid) return;

    const taskData = this.form.value;
    if (this.task?.id) {
      this.taskService.updateTask(this.task.id, taskData).subscribe(() => this.close.emit());
    } else {
      this.taskService.createTask(taskData).subscribe(() => this.close.emit());
    }
  }

  cancel(): void {
    this.close.emit();
  }
}
