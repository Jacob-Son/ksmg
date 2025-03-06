import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from './auth.controller';
import { WalletModule } from 'src/wallet/wallet.module';
import { WalletService } from 'src/wallet/wallet.service';

@Global()
@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    WalletModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, WalletService],
  exports: [AuthService],
})
export class AuthModule {}
