import { randomUUID } from "crypto";
import { sellers } from "../database";


type Seller = {
    id: string;
    name: string;
    lastName: string;
};


const getSeller = (args: { id: string }): Seller | undefined => {
    return sellers.find((seller) => seller.id === args.id)
}

const getSellers = (): Seller[] => {
    return sellers
}

const createSeller = (args: {
    name: string;
    lastName: string;
}): Seller => {
    const generatedId = randomUUID().toString();
    const seller = { id: generatedId, ...args };
    sellers.push(seller);
    return seller
}

const updateSeller = (args: {
    id: string;
    name?: string;
    lastName?: string;
}): Seller => {
    const index = sellers.findIndex((seller) => seller.id === args.id);
    const seller = sellers[index];

    if (args.name) seller.name = args.name;
    if (args.lastName) seller.lastName = args.lastName;

    return seller
}

const deleteSeller = (args: { id: string }): string => {
    // loop through pets array and delete pet with id
    const index = sellers.findIndex((seller) => seller.id === args.id);
    if (index !== -1) {
        sellers.splice(index, 1);
    }

    return args.id;
};

export {
    getSeller,
    getSellers,
    createSeller,
    updateSeller,
    deleteSeller,
};



