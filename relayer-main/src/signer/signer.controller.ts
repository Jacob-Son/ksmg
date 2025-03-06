import { Controller, Post, Body, Request } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { SignerService } from './signer.service';
import { HttpStatus } from '@nestjs/common';
import { SignMessageDto, SignMessageResponse } from './dto/signer.dto';

@Controller('signer')
@ApiTags('signer')
export class SignerController {
  constructor(private readonly signerService: SignerService) {}

  @Post('sign-message')
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      '유저의 password를 이용하여 private key를 복구, 임의의 메시지에 서명',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '서명된 메시지',
    type: SignMessageResponse,
  })
  async signMessage(
    @Request() req,
    @Body() signMessageDto: SignMessageDto,
  ): Promise<SignMessageResponse> {
    return await this.signerService.signMessage(
      req.user.sub,
      signMessageDto.password,
      signMessageDto.message,
    );
  }
}
