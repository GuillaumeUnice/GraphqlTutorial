export class Task {
  constructor(_id, title, isCompleted) {
    this._id = _id
    this.title = title
    this.isCompleted = (isCompleted) : true ? false
  }
}

export class TaskList {
  constructor(_id, name, tasks) {
    this._id = _id
    this.name = name
    this.tasks = (tasks) : tasks ? []
  }
}
