import { ApiProperty } from '@nestjs/swagger';
import { LoginType, UserRole } from '@prisma/client';

export class UpdateUserRoleDto {
  @ApiProperty({
    description: 'Email of the user',
    example: 'abc@naver.com',
    enum: UserRole,
  })
  email: string;

  @ApiProperty({
    description: 'Login type of the user',
    example: 'KAKAO',
    enum: UserRole,
  })
  loginType: LoginType;

  @ApiProperty({
    description: 'Role of the user',
    example: 'USER',
    enum: UserRole,
  })
  role: UserRole;
}
