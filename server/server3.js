import express from 'express'
import graphql from 'graphql'
// This package will handle GraphQL server requests and responses
// for you, based on your schema.
import {graphqlExpress, graphiqlExpress} from 'apollo-server-express'
import {Schema} from './server/schema3.js'
import {db} from './server/config/constants'

// This package automatically parses JSON requests.
import bodyParser from 'body-parser'

let app = express()
// app.use('/', expressGraphql({
//   schema: Schema,
//   graphiql: true
// }))
// console.warn(Schema)
app.use('/graphql',
  bodyParser.json(),
  graphqlExpress({schema: Schema})
);

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.listen(3000)
console.log('GraphQL Sandbox started on port: 3000')
