import { PutObjectCommand } from '@aws-sdk/client-s3';
import S3CLIENT from '../configs/aws';

export const uploadMetadata = async (
  metadata: string,
  collectionAddress: string,
  tokenId: string,
) => {
  const fileKey =
    'metadata/' +
    String(collectionAddress).toLowerCase() +
    '/' +
    tokenId +
    '.json';
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileKey,
    Body: metadata,
    ContentType: 'application/json',
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
