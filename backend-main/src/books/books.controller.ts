import { Controller, Get, Headers, Query, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { ApiResponseType } from 'src/common/types/api';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { getBookReponse } from './swagger/response';
import { ConfigService } from '@nestjs/config';
import { GetBookInfoDto } from './dto/get-book-info.dto';
import { GetBookReponseData } from './type/response';
import { UserRole } from '@prisma/client';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { AuthService } from 'src/auth/auth.service';

@Controller('books')
@UseGuards(RolesGuard)
export class BooksController {
  constructor(
    private readonly bookService: BooksService,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  @Get('/')
  @ApiTags('books')
  @ApiOperation({
    summary: 'Get book info',
    description: '책 정보를 가져옵니다.',
  })
  @ApiResponse(getBookReponse)
  @Roles(UserRole.ADMIN, UserRole.CREATOR, UserRole.USER)
  async getBookInfo(
    @Headers('authorization') authorization: string,
    @Query() query: GetBookInfoDto,
  ): Promise<ApiResponseType<GetBookReponseData>> {
    const user = await this.authService.getUser(authorization);

    await this.bookService.checkOrderStatusAndSettle(
      query.collectionAddress,
      query.tokenId,
      user.userAddress,
    );
    const isOwner = await this.bookService.checkBookOwnership(
      query.collectionAddress,
      query.tokenId,
      user.userAddress,
    );

    if (!isOwner) {
      return {
        success: false,
        error: '권한이 없습니다.',
        data: null,
      };
    }

    const result = await this.bookService.getBookInfo(
      query.collectionAddress,
      query.tokenId,
    );
    if (!result.success) {
      return {
        success: result.success,
        error: result.error,
        data: null,
      };
    }
    const imagePrefix = this.configService.get<string>('BOOK_IMAGE_PREFIX');
    const bookImages = await this.bookService.getBookImage(
      imagePrefix,
      result.data.bookId,
    );
    const s3Prefix = this.configService.get<string>('S3_PREFIX');
    const fullAudioPath = result.data.fullAudioPath
      ? `${s3Prefix}/${result.data.fullAudioPath}`
      : null;
    return {
      success: result.success,
      error: result.error,
      data: { ...result.data, bookImages, fullAudioPath },
    };
  }
}
