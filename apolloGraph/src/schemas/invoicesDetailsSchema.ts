
export const invoiceDetailsSchema = `#graphql


input InvoiceDetailCreateInput{
    invoiceId: Int!
    productId: Int!
    quantity: Int!
    price: Float! 
}

input InvoiceDetailUpdateInput {
    invoiceId: Int
    productId: Int
    quantity: Int
    price: Float
}

type InvoiceDetail {
 id: ID!
 invoice: Invoice!
 product: Product!
 quantity: Int!
 price: Float!
}

type Query {
     invoiceDetailsGet: [InvoiceDetail]
     invoiceDetailGetById(id: Int!): InvoiceDetail
 }

type Mutation {
     invoiceDetailCreate(input: InvoiceDetailCreateInput!): InvoiceDetail!
     invoiceDetailUpdate(id: Int!,input: InvoiceDetailUpdateInput!): InvoiceDetail!
     invoiceDetailDelete(id: Int!): Int!
 }
`;

