import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/database/prisma.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async create({ email, password }: CreateAuthDto) {
    const user = await this.prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new ConflictException('Incorrect email/password combination');
    }

    const paylod = { subject: user.id, email: user.email };
    const token = this.jwtService.sign(paylod);

    return {
      token,
      user,
    };
  }
}
