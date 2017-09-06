import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLNonNull
} from 'graphql'

import {db} from '../config/constants'
import {Task, TaskList} from '../queries/task'

///////////////////////////////////////////////////////////////////
//                 Create Task mutation                          //
///////////////////////////////////////////////////////////////////
const CreateTaskInput = new GraphQLInputObjectType({
  name: 'CreateTaskInput',
  fields: () => ({
    _taskListId: {type: new GraphQLNonNull(GraphQLString)},
    title: {type: new GraphQLNonNull(GraphQLString)},
    isCompleted: {type: GraphQLBoolean}
  })
})

export const createTask = {
  name: 'createTask',
  description: 'Create a new task',
  type: Task,
  args: {
    createTaskInput: {type: new GraphQLNonNull(CreateTaskInput)}
  },
  resolve: (rootValue, {createTaskInput}) => {
    const newTask = {
      _id: db.ObjectId(),
      title: createTaskInput.title,
      isCompleted: (createTaskInput.isCompleted) ? 1 : 0
    }
    return db.task.findAndModify({
      query: {'_id': db.ObjectId(createTaskInput._taskListId)},
      update: { $push: { 'tasks': newTask } }
    }).then((res) => {
      if(res.ok && res.lastErrorObject.n === 1) {
        return newTask
      } else {
        throw new Error('No TaskList found to push the new Task')
      }
    })
  }
}


///////////////////////////////////////////////////////////////////
//                  Remove Task mutation                         //
///////////////////////////////////////////////////////////////////
const RemoveTaskInput = new GraphQLInputObjectType({
  name: 'RemoveTaskInput',
  fields: () => ({
    _taskListId: {type: new GraphQLNonNull(GraphQLString)},
    _id: {type: new GraphQLNonNull(GraphQLString)}
  })
})

export const removeTask = {
  name: 'removeTask',
  description: 'Remove a new task',
  type: GraphQLBoolean,
  args: {
    removeTaskInput: {type: new GraphQLNonNull(RemoveTaskInput)}
  },
  resolve: (rootValue, {removeTaskInput}) => {
    return db.task.findAndModify({
      query: {
        '_id': db.ObjectId(removeTaskInput._taskListId),
        'tasks._id': db.ObjectId(removeTaskInput._id),
      },
      update: { $pull: { 'tasks': {'_id': db.ObjectId(removeTaskInput._id) } } }
    }).then((res) => {
      console.warn(res)
      if(res.ok && res.lastErrorObject.n === 1) {
        return true
      } else {
        throw new Error('No TaskList found to remove the Task')
      }
    })
  }
}

///////////////////////////////////////////////////////////////////
//                Update Task title mutation                     //
///////////////////////////////////////////////////////////////////
const UpdateTaskTitleInput = new GraphQLInputObjectType({
  name: 'UpdateTaskTitleInput',
  fields: () => ({
    _taskListId: {type: new GraphQLNonNull(GraphQLString)},
    _id: {type: new GraphQLNonNull(GraphQLString)},
    title: {type: new GraphQLNonNull(GraphQLString)}
  })
})

// Here it's just a simple property so no need to use
// a patch field which represente what we want to update
export const updateTaskTitle = {
  name: 'updateTitleTask',
  description: 'Update task\'s title',
  type: Task,
  args: {
    updateTaskTitleInput: {type: new GraphQLNonNull(UpdateTaskTitleInput)}
  },
  // TODO: Just simple equality because ObjectID vs string
  resolve: (rootValue, {updateTaskTitleInput}) => {
    return db.task.findAndModify({
      query: {
        '_id': db.ObjectId(updateTaskTitleInput._taskListId),
        'tasks._id': db.ObjectId(updateTaskTitleInput._id),
      },
      update: { $set: { 'tasks.$.title': updateTaskTitleInput.title } }
    }).then((res) => {
      if(res.ok && res.lastErrorObject.n === 1) {
        return res.value.tasks.find((task) => {
          return task._id == updateTaskTitleInput._id
        })
      } else {
        throw new Error('No Task found to update the title')
      }
    })
  }
}

///////////////////////////////////////////////////////////////////
//                  Toggle Task mutation                         //
///////////////////////////////////////////////////////////////////
const ToggleTaskInput = new GraphQLInputObjectType({
  name: 'ToggleTaskInput',
  fields: () => ({
    _taskListId: {type: new GraphQLNonNull(GraphQLString)},
    _id: {type: new GraphQLNonNull(GraphQLString)}
  })
})

export const toggleTask = {
  name: 'toggleTask',
  description: 'Toggle a task',
  type: Task,
  args: {
    toggleTaskInput: {type: new GraphQLNonNull(ToggleTaskInput)}
  },
  resolve: (rootValue, {toggleTaskInput}) => {
    return db.task.findAndModify({
      query: {
        '_id': db.ObjectId(toggleTaskInput._taskListId),
        'tasks._id': db.ObjectId(toggleTaskInput._id),
      },
      update: {
        $bit: {
        'tasks.$.isCompleted': {
            'xor': Number(1)
          }
        }
      }
    }).then((res) => {
      return res.value
    })
  }
}

///////////////////////////////////////////////////////////////////
//                  Create TaskList mutation                     //
///////////////////////////////////////////////////////////////////
const CreateTaskListInput = new GraphQLInputObjectType({
  name: 'CreateTaskListInput',
  fields: () => ({
    name: {type: new GraphQLNonNull(GraphQLString)},
    // tasks: {type: new GraphQLList(CreateTaskInput), defaultValue: []} // show defaultValue
  })
})

export const createList = {
  name: 'createList',
  description: 'Create a new list of task',
  type: TaskList,
  args: {
    createTaskListInput: {type: new GraphQLNonNull(CreateTaskListInput)}
  },
  resolve: (rootValue, {createTaskListInput}) => {
    console.log(createTaskListInput)
    createTaskListInput.tasks = []

    return db.task.insert(createTaskListInput)
      .then((res) => {
        return res
      })
      .catch((error) => {
        throw new Error('Error to create the list of task')
      })
  }
}

///////////////////////////////////////////////////////////////////
//               Update TaskList name mutation                   //
///////////////////////////////////////////////////////////////////
const UpdateTaskListNameInput = new GraphQLInputObjectType({
  name: 'UpdateTaskListNameInput',
  fields: () => ({
    _id: {type: new GraphQLNonNull(GraphQLString)},
    name: {type: new GraphQLNonNull(GraphQLString)}
  })
})

export const updateTaskListName = {
  name: 'updateTaskListName',
  description: 'Update the name of a list of task',
  type: TaskList,
  args: {
    updateTaskListNameInput: {type: new GraphQLNonNull(UpdateTaskListNameInput)},
  },
  resolve: (rootValue, {updateTaskListNameInput}) => {
    console.log(updateTaskListNameInput)
    return db.task.findAndModify({
      query: { '_id': db.ObjectId(updateTaskListNameInput._id) },
      update: { '$set': {name : updateTaskListNameInput.name}  }
    })
    .then((res) => {
      console.warn(res)
      if(res.ok && res.lastErrorObject.n === 1) {
        return res.value
      } else {
        throw new Error('No TaskList found to update her name')
      }
    })
  }
}

///////////////////////////////////////////////////////////////////
//         Clear Task completed of a TaskList mutation           //
///////////////////////////////////////////////////////////////////
const ClearCompletedTaskListInput = new GraphQLInputObjectType({
  name: 'ClearCompletedTaskListInput',
  fields: () => ({
    _id: {type: new GraphQLNonNull(GraphQLString)},
  })
})

export const clearCompleted = {
  name: 'clearCompleted',
  description: 'remove all task completed in the list',
  type: TaskList,
  args: {
    clearCompletedTaskListInput: {type: new GraphQLNonNull(ClearCompletedTaskListInput)}
  },
  resolve: (rootValue, {clearCompletedTaskListInput}) => {
    return db.task.findAndModify({
      query: { '_id': db.ObjectId(clearCompletedTaskListInput._id) },
      update: { '$pull': {tasks: {'isCompleted' : 1}  } },
    })
    .then((res) => {
      if(res.ok && res.lastErrorObject.n === 1) {
        return res.value
      } else {
        throw new Error('No TaskList found to clear the completed task')
      }
    })
  }
}
