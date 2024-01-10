import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Rol } from '../../rols/entities/rol.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Rol, (rol) => rol.users)
  @JoinTable()
  rols: Rol[];
}
