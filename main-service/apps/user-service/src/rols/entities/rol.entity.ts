import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Rol {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  rolName: string;

  @ManyToMany(() => User, (user) => user.rols)
  users: User[];
}
