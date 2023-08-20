import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { PrismaService } from './database/prisma.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TasksModule, UsersModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
