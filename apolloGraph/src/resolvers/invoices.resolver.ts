import { AppDataSource } from "../data-source";
import { Customer } from "../entity/customer.entity";
import { Invoice } from "../entity/invoice.entity";
import { Seller } from "../entity/seller.entity";

type InvoiceType = {
    id: number;
    seller: object;
    customer: object;
    date: Date;
    total: number;
};

type InvoiceCreateInput = {
    sellerId: number;
    customerId: number;
    date: string;
    total: number;
}

type InvoiceUpdateInput = {
    sellerId?: number;
    customerId?: number;
    date?: string;
    total?: number;
}

const invoiceGetById = (args: { id: number }): InvoiceType | undefined => {
    return {} as InvoiceType;
};

const invoicesGet = async (): Promise<InvoiceType[]> => {
    const invoices = await AppDataSource
        .getRepository(Invoice)
        .find({relations: {
            seller:true,
            customer:true
        }});

    return invoices;
};

const invoiceCreate = async (args: { input: InvoiceCreateInput }): Promise<InvoiceType> => {

    const seller = await AppDataSource.getRepository(Seller).findOneBy({id: args.input.sellerId})

    if (!seller) {
        return {} as InvoiceType;
      }

    const customer = await AppDataSource.getRepository(Customer).findOneBy({id: args.input.customerId})

    if (!customer) {
        return {} as InvoiceType;
    }

    const newInvoice = await AppDataSource.getRepository(Invoice).create({...args.input,seller,customer})


    return await AppDataSource.getRepository(Invoice).save(newInvoice);
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
