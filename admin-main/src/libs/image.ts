import S3CLIENT from "@/config/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";

export const getFile = async (s3Path: string) => {
  const command = new GetObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
    Key: s3Path,
  });
  try {
    const res = await S3CLIENT.send(command);
    const streamToString = await res.Body?.transformToString("base64");
    return streamToString;
  } catch (e) {
    console.log(e);
    throw new Error("S3 get failed");
  }
};

export function base64ToBlob(base64String: string) {
  // Base64 문자열에서 데이터 부분 추출
  const base64Data = base64String;

  // Base64 문자열을 바이너리로 디코딩
  const binaryData = atob(base64Data);

  // 바이너리 데이터를 Uint8Array로 변환
  const arrayBuffer = new ArrayBuffer(binaryData.length);
  const uint8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < binaryData.length; i++) {
    uint8Array[i] = binaryData.charCodeAt(i);
  }

  // Uint8Array를 Blob으로 변환하여 반환
  return new Blob([uint8Array], { type: "image/jpeg" }); // 여기에서 'image/jpeg'를 해당 이미지 유형에 맞게 변경하세요.
}
