export function dataURLtoFile(dataURL: string, fileName: string) {
  // Convert base64 to binary
  const byteString = atob(dataURL.split(',')[1]);

  // Create a ArrayBuffer
  const arrayBuffer = new ArrayBuffer(byteString.length);

  // Create a view (as an 8-bit unsigned integer array) on the ArrayBuffer
  const uint8Array = new Uint8Array(arrayBuffer);

  // Fill the ArrayBuffer with binary data
  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }

  // Create a Blob from the ArrayBuffer
  const blob = new Blob([arrayBuffer], { type: 'image/png' }); // You can change the type as needed

  // Create a File from the Blob
  const file = new File([blob], fileName, { type: blob.type });

  return file;
}

export function encodeArticleURL(url: string) {
  if (!url.includes('article/')) return url;
  const [prefix, suffix] = url.split('article/');
  const [encoded, page] = suffix.split('books/');
  console.log(`${prefix}article/${encodeURIComponent(encoded)}books/${page}`);
  return `${prefix}article/${encodeURIComponent(encoded)}books/${page}`;
}
