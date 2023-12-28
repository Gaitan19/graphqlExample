import { buildSchema } from "graphql";

export const sellerSchema = buildSchema(`
type Seller {
 id: ID!
 name: String!
 lastName: String!
}

type Query {
     getSellers: [Seller]
     getSeller(id: ID!): Seller
 }

type Mutation {
     createSeller(name: String, lastName: String): Seller!
     updateSeller(id: ID!,name: String, lastName: String): Seller!
     deleteSeller(id: ID!): ID!
 }
`);

