import { Test, TestingModule } from '@nestjs/testing';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateNoteDto } from './dto/create-note-dto';
import { UpdateNoteDto } from './dto/update-note-dto';
import { Request } from 'express';

describe('NotesController', () => {
  let controller: NotesController;
  let service: NotesService;

  const mockNotesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockRequest = {
    user: {
      email: 'test@example.com',
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [
        {
          provide: NotesService,
          useValue: mockNotesService,
        },
      ],
    })
    .overrideGuard(AuthGuard)
    .useValue({
      canActivate: jest.fn().mockResolvedValue(true),
    })
    .compile();

    controller = module.get<NotesController>(NotesController);
    service = module.get<NotesService>(NotesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call create on the NotesService', async () => {
      const createNoteDto: CreateNoteDto = {
        title: 'TESTING ',
        content: 'TEST API CRUD TESTING'
      };
      await controller.create(createNoteDto, mockRequest as any);
      expect(service.create).toHaveBeenCalledWith(createNoteDto, mockRequest.user.email);
    });
  });

  describe('findAll', () => {
    it('should call findAll on the NotesService', async () => {
      await controller.findAll(mockRequest as any);
      expect(service.findAll).toHaveBeenCalledWith(mockRequest.user.email);
    });
  });

  describe('findOne', () => {
    it('should call findOne on the NotesService', async () => {
      const id = 'some-id';
      await controller.findOne(id, mockRequest as any);
      expect(service.findOne).toHaveBeenCalledWith(id, mockRequest.user.email);
    });
  });

  describe('update', () => {
    it('should call update on the NotesService', async () => {
      const id = 'some-id';
      const updateNoteDto: UpdateNoteDto = { /* mock data */ };
      await controller.update(id, updateNoteDto, mockRequest as any);
      expect(service.update).toHaveBeenCalledWith(id, updateNoteDto, mockRequest.user.email);
    });
  });

  describe('remove', () => {
    it('should call remove on the NotesService', async () => {
      const id = 'some-id';
      await controller.remove(id, mockRequest as any);
      expect(service.remove).toHaveBeenCalledWith(id, mockRequest.user.email);
    });
  });
});
