import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { NormalButtonCSS } from 'src/components/common/Button/Button.styles';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';

export default function Empty() {
  return (
    <div
      css={css({
        marginTop: 100,
        marginBottom: 120,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontWeight: 600,
        lineHeight: '100%',
        letterSpacing: '-0.165px',

        [mq.mobile]: {
          marginTop: 140,
        },
      })}
    >
      <p>장바구니에 담은 상품이 없습니다.</p>
      <Image
        alt="not found"
        src="/imgs/library/img_404.svg"
        width={290}
        height={208}
        css={css({ marginTop: 40 })}
      />
      <Link
        href="/category"
        css={[
          NormalButtonCSS('contained'),
          css({
            marginTop: 60,
            width: '100%',
            maxWidth: 258,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            borderRadius: 99,
            fontSize: 18,
            lineHeight: '110%',
            background: color.purple,
          }),
        ]}
      >
        쇼핑하러 가기
      </Link>
    </div>
  );
}
