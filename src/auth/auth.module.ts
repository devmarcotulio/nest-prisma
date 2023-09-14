import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';
import { UsersRepository } from 'src/users/repository/users-repository';
import { PrismaUsersRepository } from 'src/users/repository/prisma/prisma-users-repository';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.AUTH_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
