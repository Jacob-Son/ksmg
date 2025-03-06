import { ApiProperty } from '@nestjs/swagger';

export class SignMessageDto {
  @ApiProperty({
    description: 'message to sign',
    example: 'E-Book NFT tx request: buy',
  })
  message: string;

  @ApiProperty({
    description: 'user password for private key decryption',
    example: 'some-password',
  })
  password: string;
}

export class SignMessageResponse {
  @ApiProperty({
    description: 'User id',
    example: 'fdc1049d-3702-4d78-bc75-837f4dfd741f',
  })
  uid: string;

  @ApiProperty({
    description: 'Wallet address',
    example: '0x47A2b9545535BE022132894f3eF2ea5Ae78843ea',
  })
  walletAddress: string;

  @ApiProperty({
    description: 'message to sign',
    example: 'E-Book NFT tx request: buy',
  })
  message: string;

  @ApiProperty({
    description: 'signed message using user private key decrypted by password',
    example:
      '0x7e30ec126a8ca1d20f0085188ef74cb3f5c1f384a8b7fe8554a4699da9e9b8916266f37a0e332fce0282f7b3dd73df3282b910b8359fe0a8f3e249e39fef255f1c',
  })
  signedMessage: string;
}
