export enum FileType {
  IMAGE = 'image',
  VIDEO = 'video',
  JSON = 'json',
  UNKNOWN = 'unknown',
}

export const getImageFileExtensions = (): string[] => {
  return ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg']; // 이미지 파일 확장자 목록
};

export const getVideoFileExtensions = (): string[] => {
  return ['mp4', 'avi', 'mov', 'mkv', 'wmv']; // 비디오 파일 확장자 목록
};

export const getFileType = (fileExtension: string): FileType => {
  const imageExtensions = getImageFileExtensions();
  const videoExtensions = getVideoFileExtensions();

  if (imageExtensions.includes(fileExtension)) {
    return FileType.IMAGE;
  } else if (videoExtensions.includes(fileExtension)) {
    return FileType.VIDEO;
  } else if (fileExtension === FileType.JSON) {
    return FileType.JSON;
  } else {
    return FileType.UNKNOWN;
  }
};

export const checkFileType = (fileName: string): FileType => {
  const fileExtension = fileName.split('.').pop()?.toLowerCase() || '';
  return getFileType(fileExtension);
};
