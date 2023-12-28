export const productsSchema = `#graphql

input ProductCreateInput {
    name: String!
    description: String!
    unitofmeasure: String!
    price: Float!
    stock: Int!   
}

input ProductUpdateInput {
    name: String
    description: String
    unitofmeasure: String
    price: Float
    stock: Int  
 }


type Product {
 id: Int!
 name: String!
 description: String!
 unitofmeasure: String!
 price: Float!
 stock: Int!
}

type Query {
     productsGet: [Product]
     productGetById(id: Int!): Product
 }

type Mutation {
     productCreate(input: ProductCreateInput!): Product!
     productUpdate(id: Int!,input: ProductUpdateInput!): Product!
     productDelete(id: Int!): Int!
 }
`;
