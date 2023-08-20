import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create({ email, password }: CreateUserDto) {
    const emailExists = await this.prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (emailExists) {
      throw new ConflictException('Email already used');
    }

    const hashedPassword = await hash(password, 8);

    return await this.prisma.users.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  }

  async findAll() {
    return await this.prisma.users.findMany();
  }

  async findOne(id: string) {
    const userExists = await this.prisma.users.findUnique({
      where: {
        id,
      },
    });

    if (!userExists) {
      throw new NotFoundException(`Not found user with this ID ${id}`);
    }

    return await this.prisma.users.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, { email, password }: UpdateUserDto) {
    const userExists = await this.prisma.users.findUnique({
      where: {
        id,
      },
    });

    if (!userExists) {
      throw new NotFoundException(`Not found user with this ID ${id}`);
    }

    const emailExists = await this.prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (emailExists) {
      throw new ConflictException('Email already used');
    }

    const hashedPassword = await hash(password, 8);

    return await this.prisma.users.update({
      where: {
        id,
      },
      data: {
        email,
        password: hashedPassword,
      },
    });
  }

  async remove(id: string) {
    const userExists = await this.prisma.users.findUnique({
      where: {
        id,
      },
    });

    if (!userExists) {
      throw new NotFoundException(`Not found user with this ID ${id}`);
    }

    return await this.prisma.users.delete({
      where: {
        id,
      },
    });
  }
}
