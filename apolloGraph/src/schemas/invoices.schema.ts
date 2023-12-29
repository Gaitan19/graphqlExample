
export const invoicesSchema = `#graphql
    input InvoiceCreateInput {
  sellerId: Int!
  customerId: Int!
  date: String!
  total: Float!
}

input InvoiceUpdateInput {
  sellerId: Int
  customerId: Int
  date: String
  total: Float
}

type Invoice {
  id: Int!
  seller: Seller!
  customer: Customer!
  date: String!
  total: Float!
}

type Query {
  invoicesGet: [Invoice]
  invoiceGetById(id: Int!): Invoice
}

type Mutation {
  invoiceCreate(input: InvoiceCreateInput!): Invoice!
  invoiceUpdate(id: Int!, input: InvoiceUpdateInput!): Invoice!
  invoiceDelete(id: Int!): Int!
}
`;

