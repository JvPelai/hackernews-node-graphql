import { ApolloServer } from 'apollo-server';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const dirname = path.resolve('./src');
const schema = path.join(dirname, 'schema.graphql');

const resolvers = {
  Query: {
    info: () => 'This is the Hackernews Clone API',
    feed: () => async (parent, args, context) => context.prisma.link.findMany(),
  },
  Mutation: {
    post: (parent, args, context) => {
      const newLink = context.prisma.lik.create({
        data: {
          url: args.url,
          description: args.description,
        },
      });
      return newLink;
    },
  },
};

const prisma = new PrismaClient.PrismaClient();
const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    schema,
    'utf8',
  ),
  resolvers,
  context: {
    prisma,
  },
});

server
  .listen()
  .then(({ url }) => {
    console.log(`Server is running on ${url}`);
  });
