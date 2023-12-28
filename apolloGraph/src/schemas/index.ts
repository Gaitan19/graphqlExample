import { mergeSchemas } from '@graphql-tools/schema';
import { invoicesSchema } from './invoices.schema'

export const mergedSchema = mergeSchemas({
    typeDefs: [invoicesSchema],
})
