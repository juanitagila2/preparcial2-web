// (6%) Cree la entidad Usuario la cual tiene un número de cedula (int), 
// un nombre (string),
// un grupo  de  investigación  (string),  
// un  número  de  extensión  (int),  un  rol  (String[Profesor, 
//Decana]), un jefe (Usuario) y un id (Long-Autogenerado

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Bono } from './bono.entity';
import { Clase } from './clase.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  cedula: number;

  @Column()
  nombre: string;

  @Column()
  grupoInvestigacion: string;

  @Column()
  extension: number;

  @Column()
  rol: string; // "Profesor" o "Decana"

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'jefeId' })
  jefe: Usuario;

  @OneToMany(() => Bono, (bono) => bono.usuario)
  bonos: Bono[];

  @OneToMany(() => Clase, (clase) => clase.profesor)
  clases: Clase[];
}