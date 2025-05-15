import { Injectable, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Bono } from '../entities/bono.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Bono)
    private bonoRepository: Repository<Bono>,
  ) {}

  async crearUsuario(usuarioData: Partial<Usuario>): Promise<Usuario> {
    if (usuarioData.rol === 'Profesor') {
      const gruposValidos = ['TICSW', 'IMAGINE', 'COMIT'];
      if (!usuarioData.grupoInvestigacion || !gruposValidos.includes(usuarioData.grupoInvestigacion)) {
        throw new BadRequestException('Grupo de investigación inválido');
      }
    }
    if (usuarioData.rol === 'Decana') {
      if (
        usuarioData.extension === undefined ||
        usuarioData.extension === null ||
        usuarioData.extension.toString().length !== 8
      ) {
        throw new BadRequestException('La extensión debe tener 8 dígitos');
      }
    }
    const usuario = this.usuarioRepository.create(usuarioData);
    return this.usuarioRepository.save(usuario);
  }

  async findUsuarioById(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    return usuario;
  }

  async eliminarUsuario(id: number): Promise<void> {
    const usuario = await this.usuarioRepository.findOne({ where: { id }, relations: ['bonos'] });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    if (usuario.rol === 'Decana') {
      throw new ConflictException('No se puede eliminar un usuario con rol Decana');
    }
    if (usuario.bonos && usuario.bonos.length > 0) {
      throw new ConflictException('No se puede eliminar un usuario con bonos asociados');
    }
    await this.usuarioRepository.delete(id);
  }
}