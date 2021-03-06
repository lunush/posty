import { ApolloServer, gql } from 'apollo-server-express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import fs from 'fs'
import mongoose from 'mongoose'
import path from 'path'

import resolvers from './resolvers/index'

const MONGO_ADDRESS =
  process.env.NODE_ENV === 'production' ? 'posty-mongo' : 'localhost'

const FRONTEND_ADDRESS =
  process.env.NODE_ENV === 'production'
    ? 'http://posty.lunu.sh'
    : 'http://localhost:3000'

const typeDefs = (gql as any)`
${fs.readFileSync(path.resolve(__dirname, 'schema.graphql'), 'utf-8')}
`

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res })
})

const app = express()

app.use(cors({ credentials: true, origin: FRONTEND_ADDRESS }))

app.use(cookieParser())

mongoose
  .connect(`mongodb://${MONGO_ADDRESS}:27017/posty?retryWrites=true`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    server.applyMiddleware({ app, path: '/graphql', cors: false })
    app.listen({ port: 3456 })
  })
