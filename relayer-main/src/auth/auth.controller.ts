import { Controller, Get, Post, Param, Body, Request } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './auth.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { HttpStatus } from '@nestjs/common';
import {
  LoginDto,
  LoginOrRegisterDto,
  LoginOrRegisterResponse,
  RegisterWalletDto,
  RegisteredWalletInfo,
  ResetWalletPasswordDto,
  CheckWalletPasswordDto,
} from './dto/auth.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('test/:email/:provider')
  @Public()
  @ApiOperation({
    summary:
      '[주의: 백엔드 테스트용] 유저 이메일에 해당하는 uid를 포함한 accessToken을 발급',
  })
  @ApiOkResponse()
  async testLogin(
    @Param('email') email: string,
    @Param('provider') provider: string,
  ) {
    return await this.authService.testLogin(email, provider);
  }

  // [STEP 1]
  @Post('login-or-register')
  @Public()
  @ApiOperation({
    summary:
      '[step 1: 소셜 프로바이더 로그인/회원가입] - 소셜 프로바이더 인증 서버에서 발급한 accessToken을 이용하여 서비스 서버에 로그인 또는 회원가입',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'acess token 및 로그인/회원가입 여부 (회원가입일 경우 password 등록 필요)',
    type: LoginOrRegisterResponse,
  })
  async loginOrRegister(
    @Body() loginOrRegisterDto: LoginOrRegisterDto,
  ): Promise<LoginOrRegisterResponse> {
    return await this.authService.loginOrRegisterWithProviderAccessToken(
      loginOrRegisterDto,
    );
  }

  // [STEP 2]
  @Post('authenticate')
  @Public()
  @ApiOperation({
    summary:
      '[step 2: 서비스 로그인] - 서비스 서버에서 발급한 accessToken을 이용하여 서비스 인가 (API 접근 권한 부여)',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '회원가입 또는 로그인된 유저 정보',
    type: UserEntity,
  })
  async authenticate(@Body() loginDto: LoginDto): Promise<UserEntity> {
    return await this.authService.loginWithServiceAccessToken(loginDto);
  }

  // TODO: make it asynchronus?
  @Post('register-wallet')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '현재 유저의 비밀번호로 암호화된 지갑 생성 및 등록',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '등록된 지갑 주소 정보',
    type: RegisteredWalletInfo,
  })
  async registerWallet(
    @Request() req,
    @Body() registerWalletDto: RegisterWalletDto,
  ): Promise<RegisteredWalletInfo> {
    console.log('>>> req.user: ', req.user);
    return await this.authService.registerWallet(
      req.user.sub,
      registerWalletDto,
    );
  }

  @Post('password-check')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '현재 유저의 지갑 비밀번호 확인',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '비밀번호 일치 여부',
    type: Boolean,
  })
  async checkWalletPassword(
    @Request() req,
    @Body() checkWalletPasswordDto: CheckWalletPasswordDto,
  ): Promise<boolean> {
    return await this.authService.checkWalletPassword(
      req.user.sub,
      checkWalletPasswordDto,
    );
  }

  @Post('reset-wallet-password')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '현재 유저의 지갑 비밀번호 재설정',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '등록된 지갑 주소 정보',
    type: RegisteredWalletInfo,
  })
  async resetWalletPassword(
    @Request() req,
    @Body() resetWalletPasswordDto: ResetWalletPasswordDto,
  ): Promise<RegisteredWalletInfo> {
    return await this.authService.resetWalletPassword(
      req.user.sub,
      resetWalletPasswordDto,
    );
  }
}
