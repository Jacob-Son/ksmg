import { css } from '@emotion/react';
import Image from 'next/image';
import React from 'react';
import {
  IconButtonCSS,
  ReaderButtonCSS,
} from 'src/components/common/Button/Button.styles';
import { mq } from 'src/styles/mediaQuery';

export default function AudioPlayer({ url }: { url: string }) {
  const playerRef = React.useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handleClick = () => {
    if (!isPlaying) {
      playerRef.current.play();
    } else {
      playerRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      css={[
        ReaderButtonCSS,
        css({
          marginRight: 'auto',
          height: '36px',
          padding: '6px 12px 6px 16px',
          boxSizing: 'border-box',
          gap: 6,

          [mq.mobile]: {
            marginRight: 0,
          },
        }),
      ]}
    >
      <p>박목월 시인 시낭송</p>
      <button type="button" css={IconButtonCSS} onClick={handleClick}>
        <Image
          alt={isPlaying ? 'pause' : 'play'}
          src={`/icons/reader/ic_${isPlaying ? 'pause' : 'play'}.svg`}
          width={18}
          height={18}
        />
      </button>
      <audio ref={playerRef} onEnded={() => setIsPlaying(false)}>
        <source src={url} type="audio/mpeg" />
      </audio>
    </div>
  );
}
