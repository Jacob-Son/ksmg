import { Global, Module } from '@nestjs/common';
import { BizService } from './biz.service';

@Global()
@Module({
  providers: [BizService],
  exports: [BizService],
})
export class BizModule {}
