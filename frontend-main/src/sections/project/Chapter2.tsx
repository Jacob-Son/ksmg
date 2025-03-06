import React from 'react';
import {
  ChapterTextStyleCSS,
  ChapterTitleCSS,
  ChapterContainerCSS,
  CertifiedImageCSS,
} from './Chapter2.styles';
import { css } from '@emotion/react';
import Image from 'next/image';

export default function Chapter2() {
  return (
    <div css={ChapterContainerCSS}>
      <div css={css({ textAlign: 'center', marginBottom: '40px' })}> {/* ✅ 간격 추가 */}
        <p css={ChapterTextStyleCSS}>
          {/* Chapter <span>2</span>. */}
        </p>
        <p css={ChapterTitleCSS}>글로벌 인증 건강한 인삼</p>
      </div>

      {/* ✅ 이미지 크기 조정 (비율 유지) */}
      <div css={CertifiedImageCSS}>
        <Image
          alt="certified ginseng"
          src="/imgs/project/img_ginseng_certified.png"
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
    </div>
  );
}