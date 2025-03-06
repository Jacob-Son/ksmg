import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('/')
  @ApiTags('images')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @Body('path') path: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const image = await this.imagesService.uploadImage(file, path);
    return {
      success: true,
      error: null,
      data: image,
    };
  }
}
