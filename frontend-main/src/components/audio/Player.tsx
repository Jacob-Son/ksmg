import { css } from '@emotion/react';
import React from 'react';
import WaveSurfer from 'wavesurfer.js';
import { IconButtonCSS } from '../common/Button/Button.styles';
import Image from 'next/image';

export default function Player() {
  const wavesurfer = React.useRef<WaveSurfer | null>(null);
  const waveform = React.useRef();
  const audioURL = '/audio/audio.mp3';
  const [loaded, setLoaded] = React.useState(false);

  const [isPlaying, setIsPlaying] = React.useState(false);

  const handleClick = () => {
    if (!loaded) {
      wavesurfer.current.load(audioURL);
      wavesurfer.current.play();
      setIsPlaying(true);
      setLoaded(true);
    } else {
      if (wavesurfer && wavesurfer.current) {
        wavesurfer.current.playPause();
        setIsPlaying(wavesurfer.current.isPlaying());
      }
    }
  };
  React.useEffect(() => {
    if (waveform.current && !wavesurfer.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveform.current, // ref로 연결했기 때문에 current로 연결해주기
        barWidth: 1, // 막대 하나의 width값
        barHeight: 1,
        barGap: 2,
        progressColor: '#fff',
        waveColor: '#494949',
        autoplay: true,
        cursorColor: 'transparent',
        normalize: true,
        height: 80,
      });
    }
    return () => {
      wavesurfer.current.stop();
      wavesurfer.current.pause();
      wavesurfer.current.destroy();
      setIsPlaying(false);
    };
  }, []);
  return (
    <div
      css={css({
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      })}
    >
      <button onClick={handleClick} css={IconButtonCSS}>
        <Image
          alt={isPlaying ? 'pause' : 'play'}
          src={`/icons/project/ic_btn_${isPlaying ? 'pause' : 'play'}.svg`}
          width={50}
          height={50}
        />
      </button>
      <div
        ref={waveform}
        css={css({ width: '100%', marginTop: 30, zIndex: 1 })}
      ></div>
    </div>
  );
}
