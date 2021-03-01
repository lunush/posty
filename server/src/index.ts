import fs from 'fs'
import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'
import mongoose from 'mongoose'
import resolvers from './resolvers/index'
import path from 'path'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const typeDefs = (gql as any)`
${fs.readFileSync(path.resolve(__dirname, 'schema.graphql'), 'utf-8')}
`

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({
    req,
    res
  })
})

const app = express()

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000'
  })
)

app.use(cookieParser())

mongoose
  .connect('mongodb://localhost:27017/posty?retryWrites=true', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    server.applyMiddleware({ app, path: '/graphql', cors: false })
    app.listen({ port: 3456 })
  })
