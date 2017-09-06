import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull
} from 'graphql'

import {db} from '../config/constants'

export const Task = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    _id: {type: new GraphQLNonNull(GraphQLString)},
    title: {type: new GraphQLNonNull(GraphQLString)},
    isCompleted: {type: new GraphQLNonNull(GraphQLBoolean)}
  })
})

export const TaskList = new GraphQLObjectType({
  name: 'TaskList',
  description: 'Represent list of task',
  fields: () => ({
    _id: {type: new GraphQLNonNull(GraphQLString)},
    name: {type: new GraphQLNonNull(GraphQLString)},
    tasks: {type: new GraphQLNonNull(new GraphQLList(Task))}
  })
})

export const getAllTaskList =  {
  name: 'getAllTaskList',
  description: 'get all the list of task',
  type: new GraphQLList(TaskList),
  resolve: function(rootValue, args, info) {
    return db.task.find({}).toArray()
      .then((data) => {
        return data
      })
  }
}
