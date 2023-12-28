export const products: {
    id: string;
    name: string;
    description: string;
    unitofmeasure: string;
    price: number;
    stock: number;
}[] = [];

export const customers: {
    id: string;
    name: string;
    lastName: string;
    address: string;
    phone: number;
}[] = [];

export const sellers: {
    id: string;
    name: string;
    lastName: string;
}[] = [];

export const invoices: {
    id: string;
    sellerId: string;
    customerId: string;
    date: string;
    total: number;
}[] = [];

export const invoiceDetails: {
    id: string;
    invoiceId: string;
    productId: string;
    quantity: number;
    price: number;
}[] = []


