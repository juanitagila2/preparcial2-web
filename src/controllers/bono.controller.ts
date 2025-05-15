import { Controller, Post, Body, Get, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { BonoService } from '../services/bono.service';
import { Bono } from '../entities/bono.entity';

@Controller('bonos')
export class BonoController {
  constructor(private readonly bonoService: BonoService) {}

  @Post()
  async crearBono(@Body() bonoData: Partial<Bono>) {
    return this.bonoService.crearBono(bonoData);
  }

  @Get('codigo/:codigo')
  async findBonoByCodigo(@Param('codigo') codigo: string) {
    return this.bonoService.findBonoByCodigo(codigo);
  }

  @Get('usuario/:userId')
  async findAllBonosByUsuario(@Param('userId', ParseIntPipe) userId: number) {
    return this.bonoService.findAllBonosByUsuario(userId);
  }

  @Delete(':id')
  async deleteBono(@Param('id', ParseIntPipe) id: number) {
    return this.bonoService.deleteBono(id);
  }
}