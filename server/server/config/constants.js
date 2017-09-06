import mongo from 'promised-mongo'

const MONGO_URL = 'mongodb://172.16.0.1:27017'
const MONGO_URL_DB ='mongodb://172.16.0.1:27017/graphql-task-list'

export const db = mongo(MONGO_URL_DB)
