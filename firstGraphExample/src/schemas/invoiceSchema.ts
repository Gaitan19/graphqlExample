import { buildSchema } from "graphql";


export const invoiceSchema = buildSchema(`
type Invoice {
 id: ID!
 sellerId: Int!
 customerId: Int!
 date: String!
 total: Int!
}

type Query {
     getInvoices: [Invoice]
     getInvoice(id: ID!): Invoice
 }

type Mutation {
     createInvoice(sellerId: Int, customerId: Int, date: String, total: Int): Invoice!
     updateInvoice(id: ID!,sellerId: Int, customerId: Int, date: String, total: Int): Invoice!
     deleteInvoice(id: ID!): ID!
 }
`);

