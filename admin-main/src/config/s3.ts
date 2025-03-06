import { S3 } from "@aws-sdk/client-s3";

const S3CLIENT: S3 = new S3({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});

export default S3CLIENT;
