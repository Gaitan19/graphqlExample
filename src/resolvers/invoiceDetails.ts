import { randomUUID } from "crypto";
import { invoiceDetails } from "../database";


type InvoiceDetail = {
    id: string;
    invoiceId: string;
    productId: string;
    quantity: number;
    price: number;
}

const getInvoiceDetail = (args: { id: string }): InvoiceDetail | undefined => {
    return invoiceDetails.find((invoiceDetail) => invoiceDetail.id === args.id);
};

const getInvoiceDetails = (): InvoiceDetail[] => {
    return invoiceDetails;
};


const createInvoiceDetail = (args: {
    invoiceId: string;
    productId: string;
    quantity: number;
    price: number;
}): InvoiceDetail => {
    // generate randon uuid for pet object
    const generatedId = randomUUID().toString();
    // create pet object and save
    const invoiceDetail = { id: generatedId, ...args };
    invoiceDetails.push(invoiceDetail);
    return invoiceDetail;
};

const updateInvoiceDetail = (args: {
    id: string;
    invoiceId?: string;
    productId?: string;
    quantity?: number;
    price?: number;
}): InvoiceDetail => {
    // loop through pets array and get object of pet
    const index = invoiceDetails.findIndex((invoiceDetail) => invoiceDetail.id === args.id);
    const invoiceDetail = invoiceDetails[index];

    // update field if it is passed as an argument
    if (args.invoiceId) invoiceDetail.invoiceId = args.invoiceId;
    if (args.productId) invoiceDetail.productId = args.productId;
    if (args.quantity) invoiceDetail.quantity = args.quantity;
    if (args.price) invoiceDetail.price = args.price;


    return invoiceDetail;
};

const deleteInvoiceDetail = (args: { id: string }): string => {
    // loop through pets array and delete pet with id
    const index = invoiceDetails.findIndex((invoiceDetail) => invoiceDetail.id === args.id);
    if (index !== -1) {
        invoiceDetails.splice(index, 1);
    }

    return args.id;
};

export {
    getInvoiceDetail,
    getInvoiceDetails,
    createInvoiceDetail,
    updateInvoiceDetail,
    deleteInvoiceDetail,
};
