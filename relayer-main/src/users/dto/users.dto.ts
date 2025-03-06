import { ApiProperty } from '@nestjs/swagger';

// FIXME: UserEntity와 동기화하는 방법?
export class CreateUserDto {
  // @ApiProperty()
  // uid: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  provider: string;

  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  profileImageUrl?: string;

  // TODO: isEthereumAddress validator
  @ApiProperty({ required: false })
  walletAddress?: string;

  @ApiProperty({ required: false })
  userKeyStoreId?: number;
}
