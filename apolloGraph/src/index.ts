import { AppDataSource } from "./data-source"
//import { User } from "./entity/User"
import * as express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import * as http from 'http';
import * as cors from 'cors';
import { mergedSchema } from "./schemas";
import { mergedResolvers } from "./resolvers";

const port = 3000;

const app = express();



AppDataSource.initialize().then(async () => {



}).catch(error => console.log(error))

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;

const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];

const resolvers = {
    Query: {
        books: () => books,
    },
};





async function startServer() {
    const httpServer = http.createServer(app)
    const server = new ApolloServer({
        typeDefs: mergedSchema,
        rootValue: mergedResolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
    })
    await server.start()

    app.use(express.json())

    app.use(
        '/graphql',
        cors(),
        express.json(),
        expressMiddleware(server, {
            context: async ({ req, res }) => ({
                request: req,
                response: res,
            }),
        })
    )

    httpServer.listen(port, () => {
        console.log(`server started on ${port}!`)
    })
}

startServer();

