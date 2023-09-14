import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export abstract class UsersRepository {
  abstract create({ email, password }: CreateUserDto);

  abstract update(id: string, { email, password }: UpdateUserDto);

  abstract findById(id: string);

  abstract findByEmail(email: string);

  abstract findMany();

  abstract delete(id: string);
}
