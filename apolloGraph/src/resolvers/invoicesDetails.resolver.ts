import { AppDataSource } from "../data-source";
import { InvoiceDetail } from "../entity/invoiceDetail.entity";
import { Product } from "../entity/product.entity";
import { Invoice } from "../entity/invoice.entity";

type InvoiceDetailType = {
  id: number;
  invoice: Invoice;
  product: Product;
  quantity: number;
  price: number;
};

type InvoiceDetailCreateInput = {
    invoiceId: number;
    productId: number;
  quantity: number;
  price: number;
};

type InvoiceDetailUpdateInput = {
    invoiceId?: number;
    productId?: number;
  quantity?: number;
  price?: number;
};

const invoiceDetailGetById = async (args: { id: number }): Promise<InvoiceDetailType | undefined> => {
  const invoiceDetail = await AppDataSource.getRepository(InvoiceDetail).findOne( {
    where: {id: args.id},
    relations: ["product", "invoice","invoice.customer","invoice.customer"],
  });

  if (invoiceDetail) {
    return {
      id: invoiceDetail.id,
      quantity: invoiceDetail.quantity,
      price: invoiceDetail.price,
      product: invoiceDetail.product,
      invoice: invoiceDetail.invoice,
    };
  }

  return undefined;
};

const invoiceDetailsGet = async (): Promise<InvoiceDetailType[]> => {
  const invoiceDetails = await AppDataSource.getRepository(InvoiceDetail).find({
    relations: ["product", "invoice","invoice.customer","invoice.customer"],
  });



return invoiceDetails;
};

const invoiceDetailCreate = async (args: { input: InvoiceDetailCreateInput }): Promise<InvoiceDetailType> => {
  const product = await AppDataSource.getRepository(Product).findOne({where: {id:args.input.productId}});
  const invoice = await AppDataSource.getRepository(Invoice).findOne({where: {id:args.input.invoiceId},relations: ["seller", "customer"] });

  if (!product || !invoice) {
    return {} as InvoiceDetailType;
  }

  const newInvoiceDetail = AppDataSource.getRepository(InvoiceDetail).create({
    ...args.input,
    product,
    invoice,
  });

  return await AppDataSource.getRepository(InvoiceDetail).save(newInvoiceDetail);
};

const invoiceDetailUpdate = async (
  args: { id: number; input: InvoiceDetailUpdateInput }
): Promise<InvoiceDetailType | null> => {
  const invoiceDetailRepository = AppDataSource.getRepository(InvoiceDetail);
  const invoiceDetail = await invoiceDetailRepository.findOne( {
    where: {id:args.id},
    relations: ["product", "invoice","invoice.customer","invoice.customer"],
  });

  if (invoiceDetail) {
    const { quantity, price, productId, invoiceId } = args.input;

    if (quantity !== undefined) invoiceDetail.quantity = quantity;
    if (price !== undefined) invoiceDetail.price = price;
    if (productId !== undefined) {
      const product = await AppDataSource.getRepository(Product).findOne({where:{id:productId}});
      if (product) invoiceDetail.product = product;
    }
    if (invoiceId !== undefined) {
      const invoice = await AppDataSource.getRepository(Invoice).findOne({where:{id:invoiceId}});
      if (invoice) invoiceDetail.invoice = invoice;
    }

    const updatedInvoiceDetail = await invoiceDetailRepository.save(invoiceDetail);

    return {
      id: updatedInvoiceDetail.id,
      quantity: updatedInvoiceDetail.quantity,
      price: updatedInvoiceDetail.price,
      product: updatedInvoiceDetail.product,
      invoice: updatedInvoiceDetail.invoice,
    };
  }

  return null;
};

const invoiceDetailDelete = async (args: { id: number }): Promise<number> => {
  const result = await AppDataSource.getRepository(InvoiceDetail).delete(args.id);

  return result.affected || 0;
};

export const invoiceDetailsResolvers = {
  invoiceDetailsGet,
  invoiceDetailGetById,
  invoiceDetailCreate,
  invoiceDetailUpdate,
  invoiceDetailDelete,
};