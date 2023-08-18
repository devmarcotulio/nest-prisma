import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create({ title, description }: CreateTaskDto) {
    const task = await this.prisma.tasks.create({
      data: {
        title,
        description,
      },
    });
    return task;
  }

  async findAll() {
    return await this.prisma.tasks.findMany();
  }

  async findOne(id: string) {
    return this.prisma.tasks.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, { title, description }: UpdateTaskDto) {
    const task = await this.prisma.tasks.update({
      where: {
        id,
      },
      data: {
        title,
        description,
      },
    });
    return task;
  }

  async remove(id: string) {
    await this.prisma.tasks.delete({
      where: {
        id,
      },
    });
  }
}
