import { buildSchema } from "graphql";

export const otherSchema = `
  type Pet2 {
    id: ID!
    name: String!
    age: Int!
    pictureUri: String
    ownerName: String!
  }

  type Query {
        getPets2: [Pet2]
    }
`;

