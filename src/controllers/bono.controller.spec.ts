import { Test, TestingModule } from '@nestjs/testing';
import { BonoController } from './bono.controller';
import { BonoService } from '../services/bono.service';
import { Bono } from '../entities/bono.entity';

describe('BonoController', () => {
  let controller: BonoController;
  let service: BonoService;

  const mockBonoService = {
    crearBono: jest.fn((bonoData) => ({ id: 1, ...bonoData })),
    findBonoByCodigo: jest.fn((codigo) => ({ id: 1, codigo })),
    findAllBonosByUsuario: jest.fn((userId) => [{ id: 1, userId }]),
    deleteBono: jest.fn((id) => undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BonoController],
      providers: [
        {
          provide: BonoService,
          useValue: mockBonoService,
        },
      ],
    }).compile();

    controller = module.get<BonoController>(BonoController);
    service = module.get<BonoService>(BonoService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debería crear un bono', async () => {
    const bonoData = {
      id: 31222,
      monto: 1000,
      calificacion: 4.5,
      palabraClave: 'BONO2025',
      usuario: { id: 1 } as any, 
      clase: { id: 1 } as any
    };
    const result = await controller.crearBono(bonoData);
    expect(result).toEqual({  ...bonoData });
    expect(service.crearBono).toHaveBeenCalledWith(bonoData);
  });

  it('debería retornar un bono por código', async () => {
    const result = await controller.findBonoByCodigo('ABC123');
    expect(result).toEqual({ id: 1, codigo: 'ABC123' });
    expect(service.findBonoByCodigo).toHaveBeenCalledWith('ABC123');
  });

  it('debería retornar bonos por usuario', async () => {
    const result = await controller.findAllBonosByUsuario(42);
    expect(result).toEqual([{ id: 1, userId: 42 }]);
    expect(service.findAllBonosByUsuario).toHaveBeenCalledWith(42);
  });

  it('debería eliminar un bono', async () => {
    const result = await controller.deleteBono(1);
    expect(result).toBeUndefined();
    expect(service.deleteBono).toHaveBeenCalledWith(1);
  });
});
