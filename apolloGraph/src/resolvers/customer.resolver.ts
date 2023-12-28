import { AppDataSource } from "../data-source";
import { Customer } from "../entity/customer.entity";


type CustomerType = {
    id: number;
    name: string;
    lastName: string;
    address: string;
    phone: number;
};

type CustomerCreateInput = {
    name: string;
    lastName: string;
    address: string;
    phone: number;
};

type CustomerUpdateInput = {
    name?: string;
    lastName?: string;
    address?: string;
    phone?: number;
};


const customerGetById = async (args: { id: number }): Promise<CustomerType | undefined> => {
    const customer = await AppDataSource.getRepository(Customer).findOne({where: {id:args.id}});
  
    if (customer) {
    
    return customer
    }
  
    return undefined;
  };
  

const customersGet = async (): Promise<CustomerType[]> => {
    const customers = await AppDataSource
        .getRepository(Customer)
        .createQueryBuilder("customer")
        .getMany()

    return customers;
};

const customerCreate = async (args: { input: CustomerCreateInput }): Promise<CustomerType> => {
    const newCustomer = await AppDataSource.getRepository(Customer).create(args.input);
    const savedCustomer = await AppDataSource.getRepository(Customer).save(newCustomer);
  
    return {
        id: savedCustomer.id,
        name: savedCustomer.name,
        lastName:savedCustomer.lastName,
        address:savedCustomer.address,
        phone:savedCustomer.phone
    };
  };

  const customerUpdate = async (args: { id: number; input: CustomerUpdateInput }): Promise<CustomerType | null> => {
    const customerRepository = AppDataSource.getRepository(Customer);
    const customer = await customerRepository.findOne({where: {id:args.id}});
  
    if (customer) {
    

    if (args.input.name) customer.name = args.input.name;
    if (args.input.lastName) customer.lastName = args.input.lastName;
    if (args.input.address) customer.address = args.input.address;
    if (args.input.phone) customer.phone = args.input.phone;

    const updatedCustomer = await customerRepository.save(customer);
  
      return {
        id: updatedCustomer.id,
        name: updatedCustomer.name,
        lastName:updatedCustomer.lastName,
        address:updatedCustomer.address,
        phone:updatedCustomer.phone
      };
    // return updatedCustomer
    }
  
    return null;
  };
  

  const customerDelete = async (args: { id: number }): Promise<number> => {
    const result = await AppDataSource.getRepository(Customer).delete(args.id);
  
    return result.affected || 0;
  };
  

export const customersResolvers = {
  customerGetById,
  customersGet,
  customerCreate,
  customerUpdate,
  customerDelete,
};