
export const invoicesSchema = `#graphql
    input InvoiceCreateInput {
        sellerId: Int!
        customerId: Int!
        date: String!
        total: Float!    
    }

    input InvoiceUpdateInput {
        sellerName: String
        customerName: String
        date: String!
        total: Float!    
    }

   type Invoice {
    id: Int!
    sellerId: Int!
    customerId: Int!
    date: String!
    total: Float!
  }

  type Query {
        invoicesGet: [Invoice]
        invoiceGetById(id: Int!): Invoice
    }

  type Mutation {
        invoiceCreate(input: InvoiceCreateInput!): Invoice!
        invoiceUpdate(input: InvoiceUpdateInput!): Invoice!
        invoiceDelete(id: Int!): Int!
    }
`;

