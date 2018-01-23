import { Component, OnInit } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';
import { TaskList } from '../../models/task-list';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  public taskLists: TaskList[];
  private displayTaskListForm: boolean = false;

  constructor() { 
    this.taskLists = [ {
      _id: "sed4fd5esfe4sfe5",
      name: "GraphQL"
    },
    {
      _id: "sef556sf4r4frf",
      name: "JavaScript"
    },
  ]
  }


  ngOnInit() {
  }

  AddTaskList() {
    this.displayTaskListForm = true;

  }

  createTaskList(value) {
    console.warn(value)
  }
}
