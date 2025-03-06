import Image from 'next/image';
import React from 'react';
import {
  DeleteButtonCSS,
  UploadedImageContainerCSS,
  UploadedImageFlexCSS,
} from './UploadedImage.styles';
import { css } from '@emotion/react';

interface IUploadedImageProps {
  image: string;
  width?: number | string;
  height?: number | string;
  deleteIcon?: React.ReactNode;
  onDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
  [key: string]: unknown;
}

export default function UploadedImage({
  image,
  width = 170,
  height = 229,
  deleteIcon = (
    <Image
      alt="x icon"
      src="/icons/profile/ic_x_gray.svg"
      width={13}
      height={13}
    />
  ),
  onDelete,
  ...props
}: IUploadedImageProps) {
  return (
    <div css={UploadedImageFlexCSS} {...props}>
      <div css={[UploadedImageContainerCSS, css({ width, height })]}>
        <Image src={image} alt="uploaded image" fill={true} objectFit="cover" />
      </div>
      <button type="button" onClick={onDelete} css={DeleteButtonCSS}>
        {deleteIcon}
      </button>
    </div>
  );
}
