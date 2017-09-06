import express from 'express'
import graphql from 'graphql'
import expressGraphql from 'express-graphql'
import Schema from './server/schema.js'
import {db} from './server/config/constants'

let app = express()
app.use('/', expressGraphql({
  schema: Schema,
  graphiql: true
}))

app.listen(3000)
console.log('GraphQL Sandbox started on port: 3000')
