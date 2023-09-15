import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { TasksRepository } from '../tasks-repository';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaTasksRepository implements TasksRepository {
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

  async update(id: string, { title, description }: UpdateTaskDto) {
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

  async findById(id: string) {
    return await this.prisma.tasks.findUnique({
      where: {
        id,
      },
    });
  }

  async findMany() {
    return await this.prisma.tasks.findMany();
  }

  async delete(id: string) {
    return await this.prisma.tasks.delete({
      where: {
        id,
      },
    });
  }
}
