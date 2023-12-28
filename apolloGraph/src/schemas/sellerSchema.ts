
export const sellerSchema = `#graphql

input SellerCreateInput{
    name: String!
    lastName: String!
}

input SellerUpdateInput{
    name: String
    lastName: String
}

type Seller {
 id: Int!
 name: String!
 lastName: String!
}

type Query {
     sellersGet: [Seller]
     sellerGetById(id: Int!): Seller
 }

type Mutation {
     sellerCreate(input:SellerCreateInput!): Seller!
     sellerUpdate(id:Int!,input: SellerUpdateInput!): Seller!
     sellerDelete(id: Int!): Int!
 }
`;

