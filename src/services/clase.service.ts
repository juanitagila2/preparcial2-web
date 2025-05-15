import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clase } from '../entities/clase.entity';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class ClaseService {
  constructor(
    @InjectRepository(Clase)
    private claseRepository: Repository<Clase>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async crearClase(claseData: Partial<Clase>): Promise<Clase> {
    if (!claseData.codigo || claseData.codigo.length !== 10) {
      throw new BadRequestException('El código debe tener exactamente 10 caracteres');
    }
    if (!claseData.profesor || !claseData.profesor.id) {
      throw new BadRequestException('Debe asignar un profesor a la clase');
    }
    const profesor = await this.usuarioRepository.findOne({ where: { id: claseData.profesor.id } });
    if (!profesor) {
      throw new BadRequestException('El profesor asignado no existe');
    }
    const clase = this.claseRepository.create({
      ...claseData,
      profesor,
    });
    return this.claseRepository.save(clase);
  }

  async findClaseById(id: number): Promise<Clase> {
    const clase = await this.claseRepository.findOne({ where: { id }, relations: ['profesor', 'bonos'] });
    if (!clase) throw new NotFoundException('Clase no encontrada');
    return clase;
  }
}