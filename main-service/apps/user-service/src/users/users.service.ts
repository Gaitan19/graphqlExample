import { Rol } from './../rols/entities/rol.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Rol)
    private rolsRepository: Repository<Rol>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { rolId, ...validDto } = createUserDto;

    const rol = await this.rolsRepository.findOneBy({ id: rolId });

    if (!rol) {
      throw new BadRequestException('Rol not found');
    }

    const user = this.usersRepository.create({
      ...validDto,
      rol,
    });

    return await this.usersRepository.save(user);
  }

  async findAll() {
    return await this.usersRepository.find({
      relations: {
        rol: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.usersRepository.findOne({
      where: { id },
      relations: {
        rol: true,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { rolId, ...validDto } = updateUserDto;

    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    let rol;
    if (rolId) {
      rol = await this.rolsRepository.findOneBy({ id: rolId });
      if (!rol) {
        throw new BadRequestException('Rol not found');
      }
    }

    return await this.usersRepository.save({
      ...user,
      ...validDto,
      rol,
    });
  }

  async remove(id: number) {
    return await this.usersRepository.delete(id);
  }
}
