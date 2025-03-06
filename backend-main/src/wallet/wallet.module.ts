import { Global, Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  providers: [WalletService, ConfigService],
  exports: [WalletService],
})
export class WalletModule {}
