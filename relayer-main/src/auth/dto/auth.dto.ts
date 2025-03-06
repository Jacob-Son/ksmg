import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Custom access token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlYTllZGQwZS0wMjE0LTQ2YTctOGYxMC03MzAwYjBkZDU4ODkiLCJpYXQiOjE3MDE1OTY1NTl9.ENYFu7dQLeFDge0300OJ2W9mIR-Q5maoxcuso7XTlPg',
  })
  accessToken: string;
}

export class LoginOrRegisterDto {
  @ApiProperty({
    description: 'Social login provider',
    example: 'kakao',
  })
  provider: string; // TODO: enum

  @ApiProperty({
    description: 'Access token from social login provider',
    example: 'now5JajuLiuOoTK7_SGvf02zyd1cW6bynYsKPXVbABBBjC8OtTp-jFVpBnvzXw',
  })
  accessToken: string;
}

export class RegisterWalletDto {
  @ApiProperty({
    description: 'Phone Number (format: 01012345678)',
    example: '01012345678',
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'password for private key encryption',
    example: 'some-password',
  })
  password: string;
}

export class CheckWalletPasswordDto {
  @ApiProperty({
    description: 'check user password for private key encryption',
    example: 'some-password',
  })
  password: string;
}

export class ResetWalletPasswordDto {
  @ApiProperty({
    description: 'new password for private key encryption',
    example: 'some-password',
  })
  newPassword: string;
}

export class LoginOrRegisterResponse {
  @ApiProperty({
    description: 'User id',
    example: 'ea9edd0e-0214-46a7-8f10-7300b0dd5889',
  })
  uid: string;

  @ApiProperty({
    description: 'Custom access token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlYTllZGQwZS0wMjE0LTQ2YTctOGYxMC03MzAwYjBkZDU4ODkiLCJpYXQiOjE3MDE1OTY1NTl9.ENYFu7dQLeFDge0300OJ2W9mIR-Q5maoxcuso7XTlPg',
  })
  accessToken: string;

  @ApiProperty({
    description: 'Wallet address',
    example: '0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE',
  })
  walletAddress: string;

  @ApiProperty({
    description: 'whether wallet is registered for the user',
    example: false,
  })
  walletRegistered: boolean;
}

export class RegisteredWalletInfo {
  @ApiProperty({
    description: 'User id',
    example: 'ea9edd0e-0214-46a7-8f10-7300b0dd5889',
  })
  uid: string;

  @ApiProperty({
    description: 'Wallet address',
    example: '0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE',
  })
  walletAddress: string;
}
