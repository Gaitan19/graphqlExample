import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), HttpModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [TypeOrmModule],
})
export class ProductsModule {}
