import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { RolsModule } from '../rols/rols.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RolsModule],
  controllers: [UsersController],
  providers: [UsersService, UsersService],
  exports: [TypeOrmModule],
})
export class UsersModule {}
