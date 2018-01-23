import { Component, Input } from '@angular/core';
import { Task } from '../../models/task';

@Component({
  selector: 'task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent {

  @Input('task') task: Task;

  complete() {
    this.task.isCompleted = !this.task.isCompleted
  }

  remove() {
    console.log("remove")
  }

}