import { getFile } from "@/libs/image";

export async function GET(request: Request) {
  const searchParams = (request as any).nextUrl.searchParams;
  const imagePath = searchParams.get("imagePath");
  const base64String = await getFile(imagePath);
  return Response.json({ base64String });
}
