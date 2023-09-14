import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'bcrypt';
import { UsersRepository } from './repository/users-repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create({ email, password }: CreateUserDto) {
    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) {
      throw new ConflictException('Email already used');
    }

    const hashedPassword = await hash(password, 8);

    await this.usersRepository.create({
      email,
      password: hashedPassword,
    });
  }

  async findAll() {
    await this.usersRepository.findMany();
  }

  async findOne(id: string) {
    const userExists = await this.usersRepository.findById(id);

    if (!userExists) {
      throw new NotFoundException(`Not found user with this ID ${id}`);
    }
  }

  async update(id: string, { email, password }: UpdateUserDto) {
    const userExists = await this.usersRepository.findById(id);

    if (!userExists) {
      throw new NotFoundException(`Not found user with this ID ${id}`);
    }

    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) {
      throw new ConflictException('Email already used');
    }

    const hashedPassword = await hash(password, 8);

    await this.usersRepository.update(id, {
      email,
      password: hashedPassword,
    });
  }

  async remove(id: string) {
    const userExists = await this.usersRepository.findById(id);

    if (!userExists) {
      throw new NotFoundException(`Not found user with this ID ${id}`);
    }

    await this.usersRepository.delete(id);
  }
}
