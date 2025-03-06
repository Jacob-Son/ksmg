import { Global, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import { OrdersService } from 'src/orders/orders.service';
import { OrdersModule } from 'src/orders/orders.module';
import { PaymentsModule } from 'src/payments/payments.module';

@Global()
@Module({
  imports: [PaymentsModule, OrdersModule],
  controllers: [UsersController],
  providers: [UsersService, AuthService, OrdersService],
  exports: [UsersService],
})
export class UsersModule {}
