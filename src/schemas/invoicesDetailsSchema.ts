export const invoiceDetailsSchema = `
   type InvoiceDetails {
    id: ID!
    invoiceId: Int!
    productId: Int!
    quantity: Int!
    price: Int!
  }

  type Query {
        getInvoiceDetailss: [InvoiceDetails]
        getInvoiceDetails(id: ID!): InvoiceDetails
    }

  type Mutation {
        createInvoiceDetails(invoiceId: Int, productId: Int, quantity: Int, price: Int): InvoiceDetails!
        updateInvoiceDetails(id: ID!,invoiceId: Int, productId: Int, quantity: Int, price: Int): InvoiceDetails!
        deleteInvoiceDetails(id: ID!): ID!
    }
`;

