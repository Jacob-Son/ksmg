import { createCipheriv, randomBytes, scrypt, createDecipheriv } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { promisify } from 'util';
import * as dotenv from 'dotenv';
dotenv.config();

const password = process.env.CRYPTO_PASSWORD;

export const encryptText = async (
  prisma: PrismaService,
  textToEncrypt: string,
) => {
  let ivInfo = await prisma.config.findUnique({
    where: {
      key: 'iv',
    },
  });
  if (!ivInfo) {
    ivInfo = await prisma.config.create({
      data: {
        key: 'iv',
        value: randomBytes(16).toString('hex'),
      },
    });
  }

  const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
  const cipher = createCipheriv(
    'aes-256-ctr',
    key,
    Buffer.from(ivInfo.value, 'hex'),
  );

  const encryptedText = Buffer.concat([
    cipher.update(textToEncrypt),
    cipher.final(),
  ]);
  return {
    content: encryptedText.toString('hex'),
  };
};

// export const decryptText = async ({
//   prisma,
//   content,
// }: {
//   prisma: PrismaService;
//   content: string;
// }): Promise<string> => {
//   const ivInfo = await prisma.config.findUnique({
//     where: {
//       key: 'iv',
//     },
//   });
//   if (!ivInfo) {
//     throw new Error('해당 유저의 암호화 정보가 없습니다.');
//   }
//   const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
//   const decipher = createDecipheriv(
//     'aes-256-ctr',
//     key,
//     Buffer.from(ivInfo.value, 'hex'),
//   );

//   const decryptedText = Buffer.concat([
//     decipher.update(Buffer.from(content, 'hex')),
//     decipher.final(),
//   ]);

//   return decryptedText.toString();
// };

export const decryptText = async ({
  prisma,
  content,
}: {
  prisma: PrismaService;
  content: string | null;
}): Promise<string> => {
  // if (!content) {
  //   return ''; // 또는 null 반환 (사용처에 맞게 변경 가능)
  // }

  const ivInfo = await prisma.config.findUnique({
    where: {
      key: 'iv',
    },
  });

  if (!ivInfo) {
    throw new Error('해당 유저의 암호화 정보가 없습니다.');
  }

  const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
  const decipher = createDecipheriv(
    'aes-256-ctr',
    key,
    Buffer.from(ivInfo.value, 'hex'),
  );

  const decryptedText = Buffer.concat([
    decipher.update(Buffer.from(content, 'hex')),
    decipher.final(),
  ]);

  return decryptedText.toString();
};
