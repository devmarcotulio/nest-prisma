import { PrismaService } from 'src/database/prisma.service';
import { UsersRepository } from '../users-repository';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create({ email, password }: CreateUserDto) {
    return await this.prisma.users.create({
      data: {
        email,
        password,
      },
    });
  }

  async update(id: string, { email, password }: UpdateUserDto) {
    return await this.prisma.users.update({
      where: {
        id,
      },
      data: {
        email,
        password,
      },
    });
  }

  async findById(id: string) {
    return await this.prisma.users.findUnique({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string) {
    return await this.prisma.users.findUnique({
      where: {
        email,
      },
    });
  }

  async findMany() {
    return await this.prisma.users.findMany();
  }

  async delete(id: string) {
    return await this.prisma.users.delete({
      where: {
        id,
      },
    });
  }
}
