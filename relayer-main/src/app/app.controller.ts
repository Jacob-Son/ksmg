import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/auth.decorator';

@Controller()
@ApiTags('health')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('ping')
  @Public()
  getPong(): string {
    return this.appService.getPong();
  }
}
