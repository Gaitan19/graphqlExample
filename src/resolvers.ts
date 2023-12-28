import {
    getCustomer,
    getCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
} from "./resolvers/customerResolver"


import {

    getInvoiceDetail,
    getInvoiceDetails,
    createInvoiceDetail,
    updateInvoiceDetail,
    deleteInvoiceDetail,



} from "./resolvers/invoiceDetailsResolver"

import {

    getInvoice,
    getInvoices,
    createInvoice,
    updateInvoice,
    deleteInvoice,



} from "./resolvers/invoiceResolver"

import {
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,




} from "./resolvers/productResolver"


import {
    getSeller,
    getSellers,
    createSeller,
    updateSeller,
    deleteSeller,
} from "./resolvers/sellerResolver"



export const root = {
    getCustomer,
    getCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    getInvoiceDetail,
    getInvoiceDetails,
    createInvoiceDetail,
    updateInvoiceDetail,
    deleteInvoiceDetail,
    getInvoice,
    getInvoices,
    createInvoice,
    updateInvoice,
    deleteInvoice,
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getSeller,
    getSellers,
    createSeller,
    updateSeller,
    deleteSeller,
};
