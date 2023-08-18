import { Injectable, NotFoundException, HttpCode } from '@nestjs/common';
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
    const taskExists = await this.prisma.tasks.findUnique({
      where: {
        id,
      },
    });

    if (!taskExists) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return this.prisma.tasks.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, { title, description }: UpdateTaskDto) {
    const taskExists = await this.prisma.tasks.findUnique({
      where: {
        id,
      },
    });

    if (!taskExists) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

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

  @HttpCode(204)
  async remove(id: string) {
    const taskExists = await this.prisma.tasks.findUnique({
      where: {
        id,
      },
    });

    if (!taskExists) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    await this.prisma.tasks.delete({
      where: {
        id,
      },
    });
  }
}
