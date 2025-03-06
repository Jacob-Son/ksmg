import { PutObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';
import S3CLIENT from '../configs/aws';
import { v4 as uuidv4 } from 'uuid';
import { checkFileType } from '../utils/file';

export const uploadFile = async (
  file: Express.Multer.File,
  s3Path: string,
  name?: string,
) => {
  let fileContent = file.buffer;
  let fileKey = '';
  let contentType = '';
  if (checkFileType(file.originalname) === 'image') {
    fileKey = s3Path + '/' + (name ? name : uuidv4()) + '.webp';
    contentType = 'image/webp';
    fileContent = await compressBufferFile(file.buffer);
  } else if (checkFileType(file.originalname) === 'video') {
    fileKey = s3Path + '/' + (name ? name : uuidv4()) + '.mp4';
    contentType = 'video/mp4';
  } else {
    throw new Error('Invalid file type');
  }

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileKey,
    Body: fileContent,
    ContentType: contentType,
    ContentDisposition: 'inline',
  });
  try {
    await S3CLIENT.send(command);
    return fileKey;
  } catch (e) {
    console.log(e);
    throw new Error('S3 upload failed');
  }
};

export const compressBufferFile = async (buffer: string | Buffer) => {
  // 파일을 불러온다.
  const sharpFile = await sharp(buffer).webp({ quality: 90 }).toBuffer();
  return sharpFile;
};

export const convertPathToUrl = (path: string) => {
  if (!path) return undefined;
  return `${process.env.S3_PREFIX}/${path}`;
};
