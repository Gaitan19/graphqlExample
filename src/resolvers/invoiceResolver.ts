import { randomUUID } from "crypto";
import { invoices } from "../database";

type Invoice = {
    id: string;
    sellerId: string;
    customerId: string;
    date: string;
    total: number;
}

const getInvoice = (args: { id: string }): Invoice | undefined => {
    return invoices.find((invoice) => invoice.id === args.id);
};

const getInvoices = (): Invoice[] => {
    return invoices;
};


const createInvoice = (args: {
    sellerId: string;
    customerId: string;
    date: string;
    total: number;
}): Invoice => {
    // generate randon uuid for pet object
    const generatedId = randomUUID().toString();
    // create pet object and save
    const invoice = { id: generatedId, ...args };
    invoices.push(invoice);
    return invoice;
};

const updateInvoice = (args: {
    id: string;
    sellerId?: string;
    customerId?: string;
    date?: string;
    total?: number;
}): Invoice => {
    // loop through pets array and get object of pet
    const index = invoices.findIndex((invoice) => invoice.id === args.id);
    const invoice = invoices[index];

    // update field if it is passed as an argument
    if (args.sellerId) invoice.sellerId = args.sellerId;
    if (args.customerId) invoice.customerId = args.customerId;
    if (args.date) invoice.date = args.date;
    if (args.total) invoice.total = args.total;


    return invoice;
};

const deleteInvoice = (args: { id: string }): string => {
    // loop through pets array and delete pet with id
    const index = invoices.findIndex((invoice) => invoice.id === args.id);
    if (index !== -1) {
        invoices.splice(index, 1);
    }

    return args.id;
};

export {
    getInvoice,
    getInvoices,
    createInvoice,
    updateInvoice,
    deleteInvoice,
};
