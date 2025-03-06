import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity implements User {
  @ApiProperty()
  uid: string;

  @ApiProperty({ required: false, nullable: true })
  userKeyStoreId: number | null;

  @ApiProperty({ required: false, nullable: true })
  phoneNumber: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false, nullable: true })
  profileImageUrl: string | null;

  @ApiProperty()
  provider: string;

  @ApiProperty({ required: false, nullable: true })
  walletAddress: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  lastLoginAt: Date;
}
