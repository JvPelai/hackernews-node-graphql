import { ApolloServer } from 'apollo-server';
import fs from 'fs';
import path from 'path';

const dirname = path.resolve('./src');
const schema = path.join(dirname, 'schema.graphql');
const links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL',
}];

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => 'This is the Hackernews Clone API',
    feed: () => links,
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        // eslint-disable-next-line no-plusplus
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    schema,
    'utf8',
  ),
  resolvers,
});

server
  .listen()
  .then(({ url }) => {
    console.log(`Server is running on ${url}`);
  });
