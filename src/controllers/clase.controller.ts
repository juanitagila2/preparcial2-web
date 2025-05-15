import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ClaseService } from '../services/clase.service';
import { Clase } from '../entities/clase.entity';

@Controller('clases')
export class ClaseController {
  constructor(private readonly claseService: ClaseService) {}

  @Post()
  async crearClase(@Body() claseData: Partial<Clase>) {
    return this.claseService.crearClase(claseData);
  }

  @Get(':id')
  async findClaseById(@Param('id', ParseIntPipe) id: number) {
    return this.claseService.findClaseById(id);
  }
}