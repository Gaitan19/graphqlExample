import { AppDataSource } from "./data-source"
//import { User } from "./entity/User"
import * as express from 'express';
import { graphqlHTTP } from "express-graphql";
import schema from './schema';
import { root } from "./resolvers";


const server = express();

AppDataSource.initialize().then(async () => {

    // console.log("Inserting a new user into the database...")
    // const user = new User()
    // user.firstName = "Timber"
    // user.lastName = "Saw"
    // user.age = 25
    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)

    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(User)
    // console.log("Loaded users: ", users)

    // console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))


const PORT = 3000;

// setup graphql
server.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    })
);


server.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
});
