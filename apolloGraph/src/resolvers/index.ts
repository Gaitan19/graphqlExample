import { invoiceDetailsResolvers } from './invoicesDetails.resolver';
import { sellersResolvers } from './sellers.resolver';
import { customersResolvers } from './customer.resolver';
import { productsResolvers } from './products.resolver';
import { mergeResolvers } from '@graphql-tools/merge'
import { invoicesResolvers } from './invoices.resolver';

export const mergedResolvers = mergeResolvers({
    ...invoicesResolvers,
    ...productsResolvers,
    ...customersResolvers,
    ...sellersResolvers,
    ...invoiceDetailsResolvers
})
