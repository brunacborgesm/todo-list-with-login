import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

const tasksServiceMock = {
  list: jest.fn(async (userId: string) => [{ id: 't1', userId, title: 'A', status: 'PENDING' }]),
  create: jest.fn(async (_userId: string, dto: any) => ({ id: 't2', ...dto })),
  update: jest.fn(async (_userId: string, id: string, dto: any) => ({ id, ...dto })),
  remove: jest.fn(async () => ({ ok: true })),
};

describe('TasksController', () => {
  let controller: TasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        { provide: TasksService, useValue: tasksServiceMock },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('GET /tasks -> list', async () => {
    const req = { user: { userId: 'u1' } } as any;
    const res = await controller.list(req);
    expect(tasksServiceMock.list).toHaveBeenCalledWith('u1');
    expect(res).toEqual([{ id: 't1', userId: 'u1', title: 'A', status: 'PENDING' }]);
  });

  it('POST /tasks -> create', async () => {
    const req = { user: { userId: 'u1' } } as any;
    const dto = { title: 'A', status: 'PENDING' };
    const res = await controller.create(req, dto as any);
    expect(tasksServiceMock.create).toHaveBeenCalledWith('u1', dto);
    expect(res).toEqual({ id: 't2', ...dto });
  });

  it('PATCH /tasks/:id -> update', async () => {
    const req = { user: { userId: 'u1' } } as any;
    const res = await controller.update(req, 't1', { status: 'DONE' } as any);
    expect(tasksServiceMock.update).toHaveBeenCalledWith('u1', 't1', { status: 'DONE' });
    expect(res).toEqual({ id: 't1', status: 'DONE' });
  });

  it('DELETE /tasks/:id -> remove', async () => {
    const req = { user: { userId: 'u1' } } as any;
    const res = await controller.remove(req, 't1');
    expect(tasksServiceMock.remove).toHaveBeenCalledWith('u1', 't1');
    expect(res).toEqual({ ok: true });
  });
});
