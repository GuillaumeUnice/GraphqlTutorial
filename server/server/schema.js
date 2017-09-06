import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLFloat,
  GraphQLEnumType,
  GraphQLNonNull
} from 'graphql'

import {db} from './config/constants'
import {getAllTaskList} from './queries/task'
import {
  createTask,
  removeTask,
  updateTaskTitle,
  toggleTask,
  createList,
  updateTaskListName,
  clearCompleted
} from './mutations/task'

const Query = new GraphQLObjectType({
  name: "querie",
  description: 'root query',
  fields: () => ({
    getAllTaskList,
  })
})

const Mutation = new GraphQLObjectType({
  name: "Mutations",
  fields: () => ({
    createTask,
    removeTask,
    updateTaskTitle,
    toggleTask,
    createList,
    updateTaskListName,
    clearCompleted,
  })
})

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})

export default Schema
