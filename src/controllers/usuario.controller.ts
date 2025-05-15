import { Controller, Post, Body, Get, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../entities/usuario.entity';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async crearUsuario(@Body() usuarioData: Partial<Usuario>) {
    return this.usuarioService.crearUsuario(usuarioData);
  }

  @Get(':id')
  async findUsuarioById(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.findUsuarioById(id);
  }

  @Delete(':id')
  async eliminarUsuario(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.eliminarUsuario(id);
  }
}