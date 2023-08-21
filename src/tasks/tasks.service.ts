import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create({ title, description }: CreateTaskDto, user_id: string) {
    return await this.prisma.tasks.create({
      data: {
        title,
        description,
        Users: {
          connect: {
            id: user_id,
          },
        },
      },
    });
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

    return await this.prisma.tasks.update({
      where: {
        id,
      },
      data: {
        title,
        description,
      },
    });
  }

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
