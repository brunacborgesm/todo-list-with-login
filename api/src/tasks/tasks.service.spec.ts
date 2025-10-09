import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { ForbiddenException } from '@nestjs/common';
class PrismaMock {
  task = {
    findMany: jest.fn(),
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
}

describe('TasksService', () => {
  let service: TasksService;
  let prisma: PrismaMock;

  beforeEach(async () => {
    prisma = new PrismaMock();

    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: 'PrismaService', useValue: prisma },
      ],
    })
      .useMocker((token) => {
        if (token && typeof token === 'function' && token.name === 'PrismaService') return prisma;
        return undefined;
      })
      .compile();

    service = module.get(TasksService);
  });

  it('list: returns tasks by userId', async () => {
    prisma.task.findMany.mockResolvedValue([{ id: 't1', userId: 'u1' }]);
    const res = await service.list('u1');
    expect(prisma.task.findMany).toHaveBeenCalledWith({
      where: { userId: 'u1' },
      orderBy: { createdAt: 'desc' },
    });
    expect(res).toEqual([{ id: 't1', userId: 'u1' }]);
  });

  it('create: inserts with userId', async () => {
    prisma.task.create.mockResolvedValue({ id: 't1', title: 'A', userId: 'u1' });
    const res = await service.create('u1', { title: 'A', status: 'PENDING', description: undefined } as any);
    expect(prisma.task.create).toHaveBeenCalledWith({ data: { title: 'A', status: 'PENDING', userId: 'u1', description: undefined } });
    expect(res).toEqual({ id: 't1', title: 'A', userId: 'u1' });
  });

  it('update: forbids when task not owned', async () => {
    prisma.task.findUnique.mockResolvedValue({ id: 't1', userId: 'other' });
    await expect(service.update('u1', 't1', { status: 'DONE' } as any))
      .rejects.toThrow(ForbiddenException);
  });

  it('update: updates when owned', async () => {
    prisma.task.findUnique.mockResolvedValue({ id: 't1', userId: 'u1' });
    prisma.task.update.mockResolvedValue({ id: 't1', userId: 'u1', status: 'DONE' });
    const res = await service.update('u1', 't1', { status: 'DONE' } as any);
    expect(prisma.task.update).toHaveBeenCalledWith({ where: { id: 't1' }, data: { status: 'DONE' } });
    expect(res).toEqual({ id: 't1', userId: 'u1', status: 'DONE' });
  });

  it('remove: forbids when task not owned', async () => {
    prisma.task.findUnique.mockResolvedValue({ id: 't1', userId: 'other' });
    await expect(service.remove('u1', 't1')).rejects.toThrow(ForbiddenException);
  });

  it('remove: deletes when owned', async () => {
    prisma.task.findUnique.mockResolvedValue({ id: 't1', userId: 'u1' });
    prisma.task.delete.mockResolvedValue({ id: 't1' });
    const res = await service.remove('u1', 't1');
    expect(prisma.task.delete).toHaveBeenCalledWith({ where: { id: 't1' } });
    expect(res).toEqual({ ok: true });
  });
});
