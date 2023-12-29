import { AppDataSource } from "../data-source";
import { Customer } from "../entity/customer.entity";
import { Invoice } from "../entity/invoice.entity";
import { Seller } from "../entity/seller.entity";

type InvoiceType = {
    id: number;
    seller: Seller;
    customer: Customer;
    date: Date;
    total: number;
};

type InvoiceCreateInput = {
    sellerId: number;
    customerId: number;
    date: string;
    total: number;
};

type InvoiceUpdateInput = {
    sellerId?: number;
    customerId?: number;
    date?: string;
    total?: number;
};

const invoiceGetById = async (args: { id: number }): Promise<InvoiceType | undefined> => {
    const invoice = await AppDataSource.getRepository(Invoice).findOne({ where: { id: args.id }, relations: ["seller", "customer"] });

    if (invoice) {
        return {
            id: invoice.id,
            seller: invoice.seller,
            customer: invoice.customer,
            date: invoice.date,
            total: invoice.total,
        };
    }

    return undefined;
};

const invoicesGet = async (): Promise<InvoiceType[]> => {
    const invoices = await AppDataSource.getRepository(Invoice).find({ relations: ["seller", "customer"] });

    return invoices.map((invoice) => ({
        id: invoice.id,
        seller: invoice.seller,
        customer: invoice.customer,
        date: invoice.date,
        total: invoice.total,
    }));
};

const invoiceCreate = async (args: { input: InvoiceCreateInput }): Promise<InvoiceType> => {
    const seller = await AppDataSource.getRepository(Seller).findOne({ where: { id: args.input.sellerId } });
    const customer = await AppDataSource.getRepository(Customer).findOne({ where: { id: args.input.customerId } });

    if (!seller || !customer) {
        return {} as InvoiceType;
    }

    const newInvoice = AppDataSource.getRepository(Invoice).create({
        ...args.input,
        seller,
        customer,
    });

    return await AppDataSource.getRepository(Invoice).save(newInvoice);
};

const invoiceUpdate = async (args: { id: number; input: InvoiceUpdateInput }): Promise<InvoiceType | null> => {
    const invoiceRepository = AppDataSource.getRepository(Invoice);
    const invoice = await invoiceRepository.findOne({ where: { id: args.id }, relations: ["seller", "customer"] });

    if (invoice) {
        // Destructuring para obtener solo los campos que se proporcionan
        const { sellerId, customerId, date, total } = args.input;

        // Actualiza solo los campos que se proporcionan en input
        if (sellerId !== undefined) {
            const seller = await AppDataSource.getRepository(Seller).findOne({ where: { id: sellerId } });
            if (seller) invoice.seller = seller;
        }

        if (customerId !== undefined) {
            const customer = await AppDataSource.getRepository(Customer).findOne({ where: { id: customerId } });
            if (customer) invoice.customer = customer;
        }

        if (date !== undefined) invoice.date = new Date(date);
        if (total !== undefined) invoice.total = total;

        // Guarda el producto actualizado
        const updatedInvoice = await invoiceRepository.save(invoice);

        return {
            id: updatedInvoice.id,
            seller: updatedInvoice.seller,
            customer: updatedInvoice.customer,
            date: updatedInvoice.date,
            total: updatedInvoice.total,
        };
    }

    return null;
};

const invoiceDelete = async (args: { id: number }): Promise<number> => {
    const result = await AppDataSource.getRepository(Invoice).delete(args.id);

    return result.affected || 0;
};

export const invoicesResolvers = {
    invoicesGet,
    invoiceGetById,
    invoiceCreate,
    invoiceUpdate,
    invoiceDelete,
};