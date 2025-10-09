import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  list(userId: string) {
    return this.prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  create(userId: string, dto: CreateTaskDto) {
    return this.prisma.task.create({ data: { ...dto, userId } });
  }

  async update(userId: string, id: string, dto: UpdateTaskDto) {
    const current = await this.prisma.task.findUnique({ where: { id } });
    if (!current || current.userId !== userId) throw new ForbiddenException();
    return this.prisma.task.update({ where: { id }, data: dto });
  }

  async remove(userId: string, id: string) {
    const current = await this.prisma.task.findUnique({ where: { id } });
    if (!current || current.userId !== userId) throw new ForbiddenException();
    await this.prisma.task.delete({ where: { id } });
    return { ok: true };
  }
}
