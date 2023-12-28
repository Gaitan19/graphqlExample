import { buildSchema } from "graphql";

export const productSchema = `
   type Pet {
    id: ID!
    name: String!
    age: Int!
    pictureUri: String
    ownerName: String!
  }

  type Query {
        getPets: [Pet]
        getPet(id: ID!): Pet
    }

  type Mutation {
        createPet(name: String!, age: Int!, pictureUri: String, ownerName: String!): Pet!
        updatePet(id: ID!, name: String, age: Int, pictureUri: String, ownerName: String): Pet!
        deletePet(id: ID!): ID!
    }
`;

