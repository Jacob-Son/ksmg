import { Injectable } from '@nestjs/common';
import { uploadFile } from 'src/common/services/image';

@Injectable()
export class ImagesService {
  async uploadImage(file: Express.Multer.File, path: string) {
    const url = await uploadFile(file, path);
    return url;
  }
}
