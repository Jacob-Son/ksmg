import Image from 'next/image';
import React from 'react';
import {
  FileUploadCSS,
  FileUploadTextsFlexCSS,
  FileUploadTitleCSS,
} from './FIleUpload.styles';
import { css } from '@emotion/react';

interface IFileUploadProps {
  accept?: string;
  multiple?: boolean;
  fileNum?: number;
  maxFileSize?: number; // MB
  title?: string;
  fieTypeNotice?: string;
  onChange: (e: Event) => void;
  [key: string]: unknown;
}

const FileUpload = ({
  accept = 'image/png, image/jpeg, image/jpg',
  multiple = false,
  fileNum = 1,
  maxFileSize = 5,
  title = '미디어 파일 업로드하기',
  fieTypeNotice = 'JPG,PNG',
  onChange,
  ...props
}: IFileUploadProps) => {
  const handleImageFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = accept;
    input.multiple = multiple;
    input.maxLength = maxFileSize * 1024 * 1024 * fileNum;
    input.onchange = (e: Event) => onChange(e);
    input.click();
  };
  return (
    <div onClick={handleImageFile} css={FileUploadCSS} {...props}>
      <Image alt="upload" src="/icons/ic_upload.svg" width={47} height={46} />
      <div css={FileUploadTextsFlexCSS}>
        <p css={FileUploadTitleCSS}>{title}</p>
        <p>
          <span>파일 찾아보기</span>
        </p>
        <p>최대 크기 {maxFileSize}MB</p>
        <p>{fieTypeNotice}</p>
      </div>
    </div>
  );
};
export default FileUpload;
