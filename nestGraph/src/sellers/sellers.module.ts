import { Module } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { SellersResolver } from './sellers.resolver';
import { Seller } from './entities/seller.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Seller])],
  providers: [SellersResolver, SellersService],
  exports: [TypeOrmModule],
})
export class SellersModule {}
