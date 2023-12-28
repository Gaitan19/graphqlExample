import { buildSchema } from "graphql";
import { productSchema } from './schemas/product.schema'
import { otherSchema } from './schemas/other.schema'

//const schema = buildSchema(`${productSchema} ${otherSchema}`)

const schema = buildSchema(`
   ${types}

  type Query {
        ${queries}
    }

  type Mutation {
        ${}
    }
`);

// const schema = buildSchema(`
//    type Pet {
//     id: ID!
//     name: String!
//     age: Int!
//     pictureUri: String
//     ownerName: String!
//   }

//   type Query {
//         getPets: [Pet]
//         getPet(id: ID!): Pet
//     }

//   type Mutation {
//         createPet(name: String!, age: Int!, pictureUri: String, ownerName: String!): Pet!
//         updatePet(id: ID!, name: String, age: Int, pictureUri: String, ownerName: String): Pet!
//         deletePet(id: ID!): ID!
//     }
// `);

// const schema = {
//   ...productSchema,
// } as GraphQLSchema;

export default schema;