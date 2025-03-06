import { Controller, Get, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    summary: '로그인한 유저 정보 조회',
  })
  @ApiOkResponse({ type: UserEntity })
  async getUser(@Request() req) {
    return await this.usersService.findOne(req.user.sub);
  }
}
