import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

export abstract class TasksRepository {
  abstract create({ title, description }: CreateTaskDto, user_id: string);

  abstract findMany();

  abstract findById(id: string);

  abstract findByTitle(title: string);

  abstract update(id: string, { title, description }: UpdateTaskDto);

  abstract delete(id: string);
}
