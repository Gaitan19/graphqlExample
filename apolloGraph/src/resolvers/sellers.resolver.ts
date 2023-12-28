import { AppDataSource } from "../data-source";
import { Seller } from "../entity/seller.entity";


type SellerType = {
    id: number;
    name: string;
    lastName: string;
    
};

type SellerCreateInput = {
    name: string;
    lastName: string;
    
    
};

type SellerUpdateInput = {
    name?: string;
    lastName?: string;
};


const sellerGetById = async (args: { id: number }): Promise<SellerType | undefined> => {
    const seller = await AppDataSource.getRepository(Seller).findOne({where: {id:args.id}});
  
    if (seller) {
    
    return seller;
    }
  
    return undefined;
  };
  

const sellersGet = async (): Promise<SellerType[]> => {
    const sellers = await AppDataSource
        .getRepository(Seller)
        .createQueryBuilder("seller")
        .getMany()

    return sellers;
};

const sellerCreate = async (args: { input: SellerCreateInput }): Promise<SellerType> => {
    const newSeller = await AppDataSource.getRepository(Seller).create(args.input);
    const savedSeller = await AppDataSource.getRepository(Seller).save(newSeller);
  
    // return {
    //     id: savedSeller.id,
    //     name: savedSeller.name,
    //     lastName:savedSeller.lastName,
    //     address:savedSeller.address,
    //     phone:savedSeller.phone
    // };
    return savedSeller;
  };

  const sellerUpdate = async (args: { id: number; input: SellerUpdateInput }): Promise<SellerType | null> => {
    const sellerRepository = AppDataSource.getRepository(Seller);
    const seller = await sellerRepository.findOne({where: {id:args.id}});
  
    if (seller) {
    

    if (args.input.name) seller.name = args.input.name;
    if (args.input.lastName) seller.lastName = args.input.lastName;

    const updatedSeller = await sellerRepository.save(seller);
  
      return {
        id: updatedSeller.id,
        name: updatedSeller.name,
        lastName:updatedSeller.lastName,
      };
    // return updatedCustomer
    }
  
    return null;
  };
  

  const sellerDelete = async (args: { id: number }): Promise<number> => {
    const result = await AppDataSource.getRepository(Seller).delete(args.id);
  
    return result.affected || 0;
  };
  

export const sellersResolvers = {
  sellerGetById,
  sellersGet,
  sellerCreate,
  sellerUpdate,
  sellerDelete,
};