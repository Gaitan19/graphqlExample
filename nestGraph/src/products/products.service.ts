import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) { }

  async create(createProductInput: CreateProductInput): Promise<Product> {
    const product = this.productsRepository.create(createProductInput);

    return await this.productsRepository.save(product);
  }

  findAll() {
    return this.productsRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    return await this.productsRepository.findOne({ where: { id: id } });
  }
  async update(
    id: number,
    updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    const result = await this.productsRepository.update(id, updateProductInput);

    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return await this.productsRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    const productToRemove = await this.productsRepository.findOne({
      where: { id },
    });

    if (!productToRemove) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    await this.productsRepository.remove(productToRemove);
  }
}
