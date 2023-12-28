import { mergeSchemas } from '@graphql-tools/schema';
import { invoicesSchema } from './invoices.schema'
import { productsSchema } from './products.schema';

export const mergedSchema = mergeSchemas({
    typeDefs: [invoicesSchema,productsSchema],
})
