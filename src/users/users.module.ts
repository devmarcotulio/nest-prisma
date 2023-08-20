import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/database/prisma.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.AUTH_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UsersController, AuthController],
  providers: [UsersService, PrismaService, AuthService],
})
export class UsersModule {}
