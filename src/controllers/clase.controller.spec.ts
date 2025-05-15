import { Test, TestingModule } from '@nestjs/testing';
import { ClaseController } from './clase.controller';
import { ClaseService } from '../services/clase.service';
import { Clase } from '../entities/clase.entity';

describe('ClaseController', () => {
  let controller: ClaseController;
  let service: ClaseService;

  const mockClaseService = {
    crearClase: jest.fn(dto => ({
      id: 1,
      ...dto,
    })),
    findClaseById: jest.fn(id => ({
      id,
      nombre: 'Matemáticas Avanzadas',
      codigo: 'MAT2025001',
      numeroCreditos: 3,
      profesor: { id: 1 },
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClaseController],
      providers: [
        {
          provide: ClaseService,
          useValue: mockClaseService,
        },
      ],
    }).compile();

    controller = module.get<ClaseController>(ClaseController);
    service = module.get<ClaseService>(ClaseService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debería crear una clase', async () => {
    const claseData = {
      nombre: 'Matemáticas Avanzadas',
      codigo: 'MAT2025001',
      numeroCreditos: 3,
      profesor: { id: 1 } as any,
    };
    const result = await controller.crearClase(claseData);
    expect(result).toEqual({ id: 1, ...claseData });
    expect(service.crearClase).toHaveBeenCalledWith(claseData);
  });

  it('debería retornar una clase por id', async () => {
    const result = await controller.findClaseById(1);
    expect(result).toEqual({
      id: 1,
      nombre: 'Matemáticas Avanzadas',
      codigo: 'MAT2025001',
      numeroCreditos: 3,
      profesor: { id: 1 },
    });
    expect(service.findClaseById).toHaveBeenCalledWith(1);
  });
});