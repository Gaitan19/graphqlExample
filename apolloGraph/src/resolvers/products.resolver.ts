import { AppDataSource } from "../data-source";
import { Product } from "../entity/product.entity";


type ProductType = {
    id: number;
    name: string;
    description: string;
    unitofmeasure: string;
    price: number;
    stock: number;
};

type ProductCreateInput = {
    name: string;
    description: string;
    unitofmeasure: string;
    price: number;
    stock: number;
}

type ProductUpdateInput = {
    name?: string;
    description?: string;
    unitofmeasure?: string;
    price?: number;
    stock?: number;
}


const productGetById = async (args: { id: number }): Promise<ProductType | undefined> => {
    const product = await AppDataSource.getRepository(Product).findOne({where: {id:args.id}});
  
    if (product) {
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        unitofmeasure: product.unitofmeasure,
        price: product.price,
        stock: product.stock,
      };
    }
  
    return product;
  };
  

const productsGet = async (): Promise<ProductType[]> => {
    const products = await AppDataSource
        .getRepository(Product)
        .createQueryBuilder("product")
        .getMany()

    return products;
};

const productCreate = async (args: { input: ProductCreateInput }): Promise<ProductType> => {
    const newProduct = await AppDataSource.getRepository(Product).create(args.input);
    return await AppDataSource.getRepository(Product).save(newProduct);
  
  };

  const productUpdate = async (args: { id: number; input: ProductUpdateInput }): Promise<ProductType | null> => {
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOne({where: {id:args.id}});
  
    if (product) {
    

    if (args.input.name) product.name = args.input.name;
    if (args.input.description) product.description = args.input.description;
    if (args.input.unitofmeasure) product.unitofmeasure = args.input.unitofmeasure;
    if (args.input.price) product.price = args.input.price;
    if (args.input.stock) product.stock = args.input.stock;

    const updatedProduct = await productRepository.save(product);
  
      return {
        id: updatedProduct.id,
        name: updatedProduct.name,
        description: updatedProduct.description,
        unitofmeasure: updatedProduct.unitofmeasure,
        price: updatedProduct.price,
        stock: updatedProduct.stock,
      };
    }
  
    return null;
  };
  

  const productDelete = async (args: { id: number }): Promise<number> => {
    const result = await AppDataSource.getRepository(Product).delete(args.id);
  
    return result.affected || 0;
  };
  

export const productsResolvers = {
  productGetById,
  productsGet,
  productCreate,
  productUpdate,
  productDelete,
};