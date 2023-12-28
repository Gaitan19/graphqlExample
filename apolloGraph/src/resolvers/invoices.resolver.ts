import { AppDataSource } from "../data-source";
import { Invoice } from "../entity/invoice.entity";

type InvoiceType = {
    id: number;
    sellerName: string;
    customerName: string;
    date: Date;
    total: number;
};

type InvoiceCreateInput = {
    sellerName: string;
    customerName: string;
    date: string;
    total: number;
}

type InvoiceUpdateInput = {
    sellerName?: string;
    customerName?: string;
    date?: string;
    total?: number;
}

const invoiceGetById = (args: { id: number }): InvoiceType | undefined => {
    return {} as InvoiceType;
};

const invoicesGet = async (): Promise<InvoiceType[]> => {
    const invoices = await AppDataSource
        .getRepository(Invoice)
        .createQueryBuilder("invoice")
        .getMany()

    return invoices;
};

const invoiceCreate = (args: { input: InvoiceCreateInput }): InvoiceType => {

    return {} as InvoiceType;
};

const invoiceUpdate = (args: { input: InvoiceUpdateInput }): InvoiceType => {

    return {} as InvoiceType;
};

const invoiceDelete = (args: { id: number }): number => {
    return 1;
};

export const invoicesResolvers = {
    invoicesGet,
    invoiceGetById,
    invoiceCreate,
    invoiceUpdate,
    invoiceDelete
};
