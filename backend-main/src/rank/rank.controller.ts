import { Controller, Get } from '@nestjs/common';
import { RankService } from './rank.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('rank')
export class RankController {
  constructor(private readonly rankService: RankService) {}

  @Get('/best')
  @ApiTags('rank')
  async handleRank() {
    await this.rankService.handleBest();
  }

  @Get('/theme')
  @ApiTags('rank')
  async handleTheme() {
    await this.rankService.handleThemeRank();
  }
}
