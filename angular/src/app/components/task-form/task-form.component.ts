import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {

  @Output() createTask = new EventEmitter<string>();
  @Input() content: string = '';

}
