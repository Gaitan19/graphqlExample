import { mergeSchemas } from '@graphql-tools/schema';
import { invoicesSchema } from './invoices.schema'
import { productsSchema } from './products.schema';
import { customerSchema } from './customer.schema';
import { sellerSchema } from './sellerSchema';
import { invoiceDetailsSchema } from './invoicesDetailsSchema';

export const mergedSchema = mergeSchemas({
    typeDefs: [invoicesSchema,productsSchema,customerSchema,sellerSchema,invoiceDetailsSchema],
})
