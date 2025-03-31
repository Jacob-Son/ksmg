import { Module } from '@nestjs/common';
import { TranslationService } from './translation.service';
import { TranslationController } from './translation.controller';

@Module({
  providers: [TranslationService],
  controllers: [TranslationController],
  exports: [TranslationService], // 다른 모듈에서 사용 가능하도록
})
export class TranslationModule {}
