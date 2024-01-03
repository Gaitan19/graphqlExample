import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSellerInput } from './dto/create-seller.input';
import { UpdateSellerInput } from './dto/update-seller.input';
import { Seller } from './entities/seller.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SellersService {
  constructor(
    @InjectRepository(Seller)
    private sellersRepository: Repository<Seller>,
  ) { }

  async create(createSellerInput: CreateSellerInput) {
    const newSeller = this.sellersRepository.create(createSellerInput);
    return await this.sellersRepository.save(newSeller);
  }

  async findAll(): Promise<Seller[]> {
    return await this.sellersRepository.find();
  }

  async findOne(id: number): Promise<Seller> {
    return await this.sellersRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateSellerInput: UpdateSellerInput,
  ): Promise<Seller> {
    await this.sellersRepository.update(id, updateSellerInput);
    return await this.sellersRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    const sellerToDelete = await this.sellersRepository.findOne({
      where: { id },
    });
    if (!sellerToDelete) {
      throw new NotFoundException(`Seller with ID ${id} not found`);
    }

    await this.sellersRepository.remove(sellerToDelete);
  }
}
