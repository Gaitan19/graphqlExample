import { productsResolvers } from './products.resolver';
import { mergeResolvers } from '@graphql-tools/merge'
import { invoicesResolvers } from './invoices.resolver';

export const mergedResolvers = mergeResolvers({
    ...invoicesResolvers,
    ...productsResolvers
})
