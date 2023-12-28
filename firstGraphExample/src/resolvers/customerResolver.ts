import { randomUUID } from "crypto";
import { customers } from "../database";


type Customer = {
    id: string;
    name: string;
    lastName: string;
    address: string;
    phone: number;
};


const getCustomer = (args: { id: string }): Customer | undefined => {
    return customers.find((customer) => customer.id === args.id)
}

const getCustomers = (): Customer[] => {
    return customers
}

const createCustomer = (args: {
    name: string;
    lastName: string;
    address: string;
    phone: number;
}): Customer => {
    const generatedId = randomUUID().toString();
    const customer = { id: generatedId, ...args };
    customers.push(customer);
    return customer
}

const updateCustomer = (args: {
    id: string;
    name?: string;
    lastName?: string;
    address?: string;
    phone?: number;
}): Customer => {
    const index = customers.findIndex((customer) => customer.id === args.id);
    const customer = customers[index];

    if (args.name) customer.name = args.name;
    if (args.lastName) customer.lastName = args.lastName;
    if (args.address) customer.address = args.address;
    if (args.phone) customer.phone = args.phone;

    return customer
}

const deleteCustomer = (args: { id: string }): string => {
    // loop through pets array and delete pet with id
    const index = customers.findIndex((customer) => customer.id === args.id);
    if (index !== -1) {
        customers.splice(index, 1);
    }

    return args.id;
};

export {
    getCustomer,
    getCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
};



