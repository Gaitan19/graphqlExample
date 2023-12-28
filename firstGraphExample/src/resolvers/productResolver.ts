import { randomUUID } from "crypto";
import { products } from "../database";

type Product = {
    id: string;
    name: string;
    description: string;
    unitofmeasure: string;
    price: number;
    stock: number;
};

const getProduct = (args: { id: string }): Product | undefined => {
    return products.find((product) => product.id === args.id);
};

const getProducts = (): Product[] => {
    return products;
};


const createProduct = (args: {
    name: string;
    description: string;
    unitofmeasure: string;
    price: number;
    stock: number;
}): Product => {
    // generate randon uuid for pet object
    const generatedId = randomUUID().toString();
    // create pet object and save
    const product = { id: generatedId, ...args };
    products.push(product);
    return product;
};

const updateProduct = (args: {
    id: string;
    name?: string;
    description?: string;
    unitofmeasure?: string;
    price?: number;
    stock: number;
}): Product => {
    // loop through pets array and get object of pet
    const index = products.findIndex((product) => product.id === args.id);
    const product = products[index];

    // update field if it is passed as an argument
    if (args.description) product.description = args.description;
    if (args.name) product.name = args.name;
    if (args.unitofmeasure) product.unitofmeasure = args.unitofmeasure;

    return product;
};

const deleteProduct = (args: { id: string }): string => {
    // loop through pets array and delete pet with id
    const index = products.findIndex((product) => product.id === args.id);
    if (index !== -1) {
        products.splice(index, 1);
    }

    return args.id;
};

export {
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
};
