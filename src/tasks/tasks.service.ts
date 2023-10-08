import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksRepository } from './repository/tasks-repository';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  async create({ title, description }: CreateTaskDto, user_id: string) {
    const task = await this.tasksRepository.findByTitle(title);

    if (task) {
      throw new ConflictException(`Title ${title} already used`);
    }

    await this.tasksRepository.create(
      {
        title,
        description,
      },
      user_id,
    );
  }

  async findAll() {
    return await this.tasksRepository.findMany();
  }

  async findOne(id: string) {
    const task = await this.tasksRepository.findById(id);

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async findByTitle(title: string) {
    const task = await this.tasksRepository.findByTitle(title);

    if (!task) {
      throw new NotFoundException(`Task with title ${title} not found`);
    }

    return task.id;
  }

  async update(id: string, { title, description }: UpdateTaskDto) {
    const taskExists = await this.tasksRepository.findById(id);

    if (!taskExists) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    await this.tasksRepository.update(id, {
      title,
      description,
    });
  }

  async remove(id: string) {
    const taskExists = await this.tasksRepository.findById(id);

    if (!taskExists) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    await this.tasksRepository.delete(id);
  }
}
