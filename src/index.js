/* eslint-disable import/extensions */
import { ApolloServer } from 'apollo-server';
import PrismaClient from '@prisma/client';
import fs from 'fs';
import path from 'path';
import feed from './resolvers/Query.js';
import links from './resolvers/User.js';
import postedBy from './resolvers/Link.js';
import { login, post, signup } from './resolvers/Mutation.js';
import { getUserId } from './helpers.js';

const dirname = path.resolve('./src');
const schema = path.join(dirname, 'schema.graphql');
const prisma = new PrismaClient.PrismaClient();

const resolvers = {
  Query: {
    feed,
  },
  User: {
    links,
  },
  Link: {
    postedBy,
  },
  Mutation: {
    login,
    signup,
    post,
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    schema,
    'utf8',
  ),
  resolvers,
  context: ({ req }) => ({
    ...req,
    prisma,
    userId: req && req.headers.authorization ? getUserId(req) : null,
  }),
});

server
  .listen()
  .then(({ url }) => {
    console.log(`Server is running on ${url}`);
  });
