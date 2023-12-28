import { buildSchema } from "graphql";

export const customerSchema = buildSchema(`
type Customer {
 id: ID!
 name: String!
 lastName: String!
 address: String!
 phone: Int!
}

type Query {
     getCustomers: [Customer]
     getCustomer(id: ID!): Customer
 }

type Mutation {
     createCustomer(name: String, lastName: String, address: String, phone: Int): Customer!
     updateCustomer(id: ID!,name: String, lastName: String, address: String, phone: Int): Customer!
     deleteCustomer(id: ID!): ID!
 }
`);

