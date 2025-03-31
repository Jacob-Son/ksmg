import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function SocialNetwork(props: { [key: string]: unknown }) {
  return (
    <div
      css={css({
        display: 'flex',
        alignItems: 'center',
        gap: 20,
      })}
      {...props}
    >
      {/* <Link
        href="https://www.instagram.com/pickapen_official"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          alt="instagram"
          src="/icons/social_networks/ic_instagram_gray.svg"
          width={31}
          height={30}
        />
      </Link>
      <Link
        href="https://blog.naver.com/pickapen"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          alt="naver"
          src="/icons/social_networks/ic_naver.svg"
          width={31}
          height={30}
        />
      </Link>
      <Link
        href="https://www.youtube.com/@pickapen"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          alt="youtube"
          src="/icons/social_networks/ic_youtube_gray.svg"
          width={35}
          height={34}
        />
      </Link>
      <Link
        href="https://open.kakao.com/o/saYnNqeg"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          alt="kakao"
          src="/icons/social_networks/ic_kakaotalk.svg"
          width={31}
          height={32}
        />
      </Link> */}
    </div>
  );
}
