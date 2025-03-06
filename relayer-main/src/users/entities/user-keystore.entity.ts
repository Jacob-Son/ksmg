import { UserKeyStore } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserKeyStoreEntity implements UserKeyStore {
  @ApiProperty()
  id: number;

  @ApiProperty()
  address: string;

  @ApiProperty()
  shareB1: string;

  @ApiProperty()
  shareB2: string;

  @ApiProperty()
  encryptedShareC: string;

  @ApiProperty()
  passwordHash: string;

  @ApiProperty()
  salt: string;

  @ApiProperty()
  iv: string;
}
