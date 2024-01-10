import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Rol } from '../../rols/entities/rol.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Rol, (rol) => rol.user)
  rol: Rol;
}
