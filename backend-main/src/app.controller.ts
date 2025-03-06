import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/healthz')
  @ApiTags('healthz')
  @ApiOperation({
    summary: 'Check healthz',
    description: '서버의 상태를 확인합니다.',
  })
  checkHealthz(): string {
    return this.appService.checkHealthz();
  }
}
