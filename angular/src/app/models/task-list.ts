import { Task } from "./task";

export interface TaskList {
    _id: string,
    name: string,
    tasks?: Task[]
}
