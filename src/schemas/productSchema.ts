import { buildSchema } from "graphql";

export const productSchema = `
   type Product {
    id: ID!
    name: String!
    description: String!
    unitofmeasure: String!
    price: Int!
    stock: Int!
  }

  type Query {
        getProducts: [Product]
        getProduct(id: ID!): Product
    }

  type Mutation {
        createProduct(name: String, description: String, unitofmeasure: String, price: Int,stock: Int): Product!
        updateProduct(id: ID!, name: String, description: String, unitofmeasure: String, price: Int,stock: Int): Product!
        deleteProduct(id: ID!): ID!
    }
`;

