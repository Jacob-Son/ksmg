import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { OrdersService } from 'src/orders/orders.service';
import { PaymentsModule } from 'src/payments/payments.module';

@Module({
  imports: [PaymentsModule],
  controllers: [BooksController],
  providers: [
    BooksService,
    ConfigService,
    AuthService,
    UsersService,
    OrdersService,
  ],
})
export class BooksModule {}
