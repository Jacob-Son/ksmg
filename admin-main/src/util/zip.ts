import { base64ToBlob } from "@/libs/image";
import axios from "axios";
import JSZIP from "jszip";

export const downloadZip = async (images: string[], folderName: string) => {
  const zip = new JSZIP();

  for (let i = 0; i < images.length; i++) {
    const image = images[i];

    const { base64String } = (
      await axios.get("/api/image", {
        params: {
          imagePath:
            "3vsdcw32fwdfea34t342wf23rfwfs23fee2/" +
            image
              .split(process.env.NEXT_PUBLIC_S3_BUCKET_NAME!)[1]
              .substring(1),
        },
      })
    ).data;

    // base64 to blob
    const fileBlob = base64ToBlob(base64String);
    zip.file(i + "." + "jpg", fileBlob);
  }

  /* ZIP 파일 생성 */
  zip
    .generateAsync({ type: "blob" })
    .then((resZip) => {
      const a = document.createElement("a");

      a.href = URL.createObjectURL(resZip);
      a.download = folderName + ".zip";
      a.innerHTML = "download";

      document.body.appendChild(a);
      a.click();

      /* 메모리 누수 방지 */
      URL.revokeObjectURL(a.href);
    })
    .catch((error) => {
      console.log(error);
    });
};
