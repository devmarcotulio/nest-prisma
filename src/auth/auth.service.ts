import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { compare } from 'bcrypt';
import { UsersRepository } from 'src/users/repository/users-repository';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersRepository: UsersRepository,
  ) {}

  async create({ email, password }: CreateAuthDto) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new ConflictException('Incorrect email/password combination');
    }

    const paylod = { sub: user.id };
    const token = await this.jwtService.signAsync(paylod);

    return {
      token,
      user_id: user.id,
    };
  }
}
