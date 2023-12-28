
export const customerSchema = `#graphql

input CustomerCreateInput {
    name: String!
    lastName: String!
    address: String!
    phone: Int!
}

input CustomerUpdateInput {
    name: String
    lastName: String
    address: String
    phone: Int
}


type Customer {
 id: Int!
 name: String!
 lastName: String!
 address: String!
 phone: Int!
}

type Query {
     customersGet: [Customer]
     customerGetById(id: Int!): Customer
 }

type Mutation {
     customerCreate(input: CustomerCreateInput!): Customer!
     customerUpdate(id:Int! ,input: CustomerUpdateInput!): Customer!
     customerDelete(id: Int!): Int!
 }
`;

