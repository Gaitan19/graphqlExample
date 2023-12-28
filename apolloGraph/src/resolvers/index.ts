import { mergeResolvers } from '@graphql-tools/merge'
import { invoicesResolvers } from './invoices.resolver';

export const mergedResolvers = mergeResolvers({
    ...invoicesResolvers
})
