import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserProfileDto {
  @ApiProperty({
    description: 'Image of the user profile',
    example: 'profileImage',
    type: 'file',
    format: 'binary',
  })
  profileImage: any;

  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe',
  })
  name?: string;

  @ApiProperty({
    description: 'Creator name of the user',
    example: '',
  })
  creatorName?: string;

  @ApiProperty({
    description: 'Phone number of the user',
    example: '01012345678',
  })
  phoneNumber?: string;
}
