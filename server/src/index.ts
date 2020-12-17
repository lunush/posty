import fs from 'fs';
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import mongoose from 'mongoose';
import resolvers from './resolvers/index';
import path from 'path';

const typeDefs = (gql as any)`
${fs.readFileSync(path.resolve(__dirname, 'schema.graphql'), 'utf-8')}
`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {
      req,
    };
  },
});

const app = express();

mongoose
  .connect('mongodb://localhost:27017/twibter?retryWrites=true', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.applyMiddleware({ app });
    app.listen({ port: 3456 });
  });
