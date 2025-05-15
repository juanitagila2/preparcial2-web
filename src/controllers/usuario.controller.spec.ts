import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../entities/usuario.entity';

describe('UsuarioController', () => {
  let controller: UsuarioController;
  let service: UsuarioService;

  const mockUsuarioService = {
    crearUsuario: jest.fn(dto => ({
      id: 1,
      ...dto,
    })),
    findUsuarioById: jest.fn(id => ({
      id,
      cedula: 12345678,
      nombre: 'Juan Perez',
      grupoInvestigacion: 'TICSW',
      extension: 12345678,
      rol: 'Profesor',
    })),
    eliminarUsuario: jest.fn(id => undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioController],
      providers: [
        {
          provide: UsuarioService,
          useValue: mockUsuarioService,
        },
      ],
    }).compile();

    controller = module.get<UsuarioController>(UsuarioController);
    service = module.get<UsuarioService>(UsuarioService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debería crear un usuario', async () => {
    const usuarioData = {
      cedula: 12345678,
      nombre: 'Juan Perez',
      grupoInvestigacion: 'TICSW',
      extension: 12345678,
      rol: 'Profesor',
    };
    const result = await controller.crearUsuario(usuarioData);
    expect(result).toEqual({ id: 1, ...usuarioData });
    expect(service.crearUsuario).toHaveBeenCalledWith(usuarioData);
  });

  it('debería retornar un usuario por id', async () => {
    const result = await controller.findUsuarioById(1);
    expect(result).toEqual({
      id: 1,
      cedula: 12345678,
      nombre: 'Juan Perez',
      grupoInvestigacion: 'TICSW',
      extension: 12345678,
      rol: 'Profesor',
    });
    expect(service.findUsuarioById).toHaveBeenCalledWith(1);
  });

  it('debería eliminar un usuario', async () => {
    const result = await controller.eliminarUsuario(1);
    expect(result).toBeUndefined();
    expect(service.eliminarUsuario).toHaveBeenCalledWith(1);
  });
});