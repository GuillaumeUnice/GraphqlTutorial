import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

import { Task } from '../../models/task';

@Component({
  selector: 'task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskPageComponent {
  private _taskSource: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  // Observable Task[] streams
  public tasks$: Observable<Task[]> = this._taskSource.asObservable();
  

  constructor(private route: ActivatedRoute) {
    console.log(this.route.snapshot.paramMap.get('id'))
    this._taskSource.next([ {
        _id: "sed4fd5esfe4sfe5",
        content: "Learn GraphQL",
        isCompleted: false
    },
    {
      _id: "sef556sf4r4frf",
      content: "Lear JS",
      isCompleted: true
    }])
  }

  createTask(content: string){
    console.log("createTask", content)
  }
  
}
