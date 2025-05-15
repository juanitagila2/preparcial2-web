//(4%) Cree la entidad Clase la cual tiene un nombre (String),
// un código (String), un número 
// de créditos (int) y un id (Long-Autogenerado).

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { Usuario } from './usuario.entity';
import { Bono } from './bono.entity';

@Entity()
export class Clase {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nombre: string;

  @Column()
  codigo: string;

  @Column()
  numeroCreditos: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.clases, { nullable: false })
  @JoinColumn({ name: 'profesorId' })
  profesor: Usuario;

  @OneToMany(() => Bono, (bono) => bono.clase)
  bonos: Bono[];
}