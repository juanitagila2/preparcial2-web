//4%) Cree la entidad Bono la cual tiene un monto (int),
// una calificación (double), una palabra 
// clave (String) y un id (Long-Autogenerado). 
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Usuario } from './usuario.entity';
import { Clase } from './clase.entity';

@Entity()
export class Bono {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  monto: number;

  @Column('float')
  calificacion: number;

  @Column()
  palabraClave: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.bonos, { nullable: false })
  @JoinColumn({ name: 'usuarioId' })
  usuario: Usuario;

  @ManyToOne(() => Clase, (clase) => clase.bonos, { nullable: false })
  @JoinColumn({ name: 'claseId' })
  clase: Clase;
}