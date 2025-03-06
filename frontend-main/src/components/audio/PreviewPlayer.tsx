import Image from 'next/image';
import React from 'react';
import { useResponsive } from 'src/hooks/common/useResponsive';
import { IconButtonCSS } from '../common/Button/Button.styles';
import {
  AudioControlsCSS,
  ErrorTextCSS,
  MainTextCSS,
  PreviewContainerCSS,
  SubTextCSS,
} from './PreviewPlayer.styles';

export default function PreviewPlayer({ url }: { url: string }) {
  const playerRef = React.useRef<HTMLAudioElement>(null);
  const { isMobile } = useResponsive();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleClick = () => {
    if (!isPlaying) {
      playerRef.current.play();
    } else {
      playerRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  React.useEffect(() => {
    if (!playerRef.current) return;
    return () => {
      playerRef.current?.pause();
    };
  }, []);

  return (
    <div css={PreviewContainerCSS}>
      <div>
        <p css={MainTextCSS}>박목월 시인의 시낭송</p>
        <p css={SubTextCSS}>
          15초 미리듣기 입니다. {isMobile && <br />}시 구매시 전체듣기가
          가능합니다.
        </p>
        {error && (
          <p css={ErrorTextCSS}>미리듣기 파일을 불러오는데 실패했습니다.</p>
        )}
      </div>
      <button
        type="button"
        css={IconButtonCSS}
        onClick={handleClick}
        disabled={error}
      >
        <Image
          alt={isPlaying ? 'pause' : 'play'}
          src={`/icons/preview/ic_${isPlaying ? 'pause' : 'play'}.svg`}
          width={37}
          height={37}
        />
      </button>
      {url && (
        <audio
          css={AudioControlsCSS}
          ref={playerRef}
          onEnded={() => setIsPlaying(false)}
          onError={() => setError(true)}
        >
          <source src={url} type="audio/mpeg" />
        </audio>
      )}
    </div>
  );
}
