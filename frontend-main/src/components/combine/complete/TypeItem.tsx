import Image from 'next/image';
import React from 'react';
import Check from 'src/components/common/Check';
import { CombineType } from './TypeItem.types';
import parse from 'html-react-parser';
import { CombineItemCSS, ImageWrapperCSS, TextCSS } from './TypeItem.styles';
import { css } from '@emotion/react';

export default function TypeItem({
  type,
  currentType,
  handleSelect,
  image,
  text,
}: {
  type: CombineType;
  currentType: CombineType;
  handleSelect: (type: CombineType | null) => void;
  image: string;
  text: string;
}) {
  return (
    <div css={CombineItemCSS}>
      <Check
        checked={type === currentType}
        onChange={(e) => {
          const checked = e.target.checked;
          if (checked) {
            handleSelect(type);
          } else {
            handleSelect(null);
          }
        }}
        layout="purple"
      />
      <div css={ImageWrapperCSS(image)} />
      <p css={TextCSS}>{parse(text.replace(/\n/g, '<br />'))}</p>
    </div>
  );
}
