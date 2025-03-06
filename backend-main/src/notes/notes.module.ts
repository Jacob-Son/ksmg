import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { UsersService } from 'src/users/users.service';
import { AuthService } from 'src/auth/auth.service';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports: [OrdersModule],
  controllers: [NotesController],
  providers: [NotesService, UsersService, AuthService],
})
export class NotesModule {}
