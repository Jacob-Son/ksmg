import React, { useRef } from 'react';
import UploadedImage from 'src/components/common/UploadedImage/UploadedImage';
import { UploadedA5ImageCSS } from './NFTForm.styles';
import { useResponsive } from 'src/hooks/common/useResponsive';
import { PageInputCSS, PageItemContainerCSS } from './NFTForm3.styles';

export default function PageItem({
  page,
  index,
  fullWidth = false,
  deleteIcon,
  onDelete,
  onPageNumChange,
  ...rest
}: {
  page: string;
  index: number;
  fullWidth?: boolean;
  deleteIcon?: React.ReactNode;
  onDelete: () => void;
  onPageNumChange: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  [key: string]: unknown;
}) {
  const itemRef = useRef(null);
  const { isMobile } = useResponsive();
  return (
    <div css={PageItemContainerCSS} {...rest}>
      <UploadedImage
        image={page}
        {...(deleteIcon && { deleteIcon })}
        onClick={() => {
          if (itemRef && itemRef.current) {
            itemRef.current.focus();
          }
        }}
        onDelete={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        {...((isMobile || fullWidth) && {
          width: '100%',
          height: 'auto',
        })}
        css={UploadedA5ImageCSS}
      />
      <input
        type="number"
        ref={itemRef}
        defaultValue={index + 1}
        onKeyDown={onPageNumChange}
        css={PageInputCSS}
      />
    </div>
  );
}
