import { Injectable, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bono } from '../entities/bono.entity';
import { Usuario } from '../entities/usuario.entity';
import { Clase } from '../entities/clase.entity';

@Injectable()
export class BonoService {
  constructor(
    @InjectRepository(Bono)
    private bonoRepository: Repository<Bono>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Clase)
    private claseRepository: Repository<Clase>,
  ) {}

  async crearBono(bonoData: Partial<Bono>): Promise<Bono> {
    if (bonoData.monto === undefined || bonoData.monto === null || bonoData.monto <= 0) {
      throw new BadRequestException('El monto debe ser positivo y no vacío');
    }
    const usuario = await this.usuarioRepository.findOne({ where: { id: bonoData.usuario?.id } });
    if (!usuario || usuario.rol !== 'Profesor') {
      throw new BadRequestException('El usuario debe existir y tener rol de Profesor');
    }
    const clase = await this.claseRepository.findOne({ where: { id: bonoData.clase?.id } });
    if (!clase) {
      throw new BadRequestException('La clase no existe');
    }
    const bono = this.bonoRepository.create({
      ...bonoData,
      usuario,
      clase,
    });
    return this.bonoRepository.save(bono);
  }

  async findBonoByCodigo(codigo: string): Promise<Bono | null> {
    return this.bonoRepository.findOne({
      where: { palabraClave: codigo },
      relations: ['usuario', 'clase'],
    });
  }

  async findAllBonosByUsuario(userID: number): Promise<Bono[]> {
    return this.bonoRepository.find({
      where: { usuario: { id: userID } },
      relations: ['usuario', 'clase'],
    });
  }

  async deleteBono(id: number): Promise<void> {
    const bono = await this.bonoRepository.findOne({ where: { id } });
    if (!bono) throw new NotFoundException('Bono no encontrado');
    if (bono.calificacion > 4) {
      throw new ConflictException('No se puede eliminar un bono con calificación mayor a 4');
    }
    await this.bonoRepository.delete(id);
  }
}