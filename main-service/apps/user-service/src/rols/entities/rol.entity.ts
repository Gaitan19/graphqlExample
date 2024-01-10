import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Rol {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  rolName: string;

  @OneToMany(() => User, (user) => user.rol)
  user: User[];
}
