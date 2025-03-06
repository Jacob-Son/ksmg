import { Module, Global } from '@nestjs/common';
import { NftsController } from './nfts.controller';
import { NftsService } from './nfts.service';

@Global()
@Module({
  controllers: [NftsController],
  providers: [NftsService],
  exports: [NftsService],
})
export class NftsModule {}
