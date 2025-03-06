import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserKeyStoreService } from './user-keystore.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, UserKeyStoreService],
  exports: [UsersService, UserKeyStoreService],
})
export class UsersModule {}
