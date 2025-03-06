import { Module } from '@nestjs/common';
import { CombineController } from './combine.controller';
import { CombineService } from './combine.service';

@Module({
  controllers: [CombineController],
  providers: [CombineService],
})
export class CombineModule {}
