import React from 'react';
import {
  DesktopNavWrapperCSS,
  IconCSS,
  InputRangeBarCSS,
  NavbarContainerCSS,
  NavbarWrapperCSS,
  PageCountCSS,
} from './Navbar.styles';
import Button from 'src/components/common/Button/Button';
import { ReaderButtonCSS } from 'src/components/common/Button/Button.styles';
import Image from 'next/image';
import { color } from 'src/styles/colors';
import { useResponsive } from 'src/hooks/common/useResponsive';
import NoteEditButton from '../NoteEditButton';
import { useNotesStore } from 'src/stores/notes/notes.store';
import AudioPlayer from './AudioPlayer';

interface IProps {
  current: number;
  step: number;
  total: number;
  isShow: boolean;
  audioUrl?: string;
  setCurrent: (val: number) => void;
  onPrev: () => void;
  onNext: () => void;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

const maxRange = 2500;

export default function Navbar({
  current,
  step,
  total,
  isShow,
  audioUrl,
  setCurrent,
  onPrev,
  onNext,
  zoom,
  onZoomOut,
  onZoomIn,
}: IProps) {
  const { isDesktop } = useResponsive();
  const { isNoteVisible, setIsNoteVisible, setIsEditing } = useNotesStore(
    (state) => ({
      isNoteVisible: state.isNoteVisible,
      setIsNoteVisible: state.setIsNoteVisible,
      setIsEditing: state.setIsEditing,
    }),
  );
  const handleChangeRangeBar = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = Math.round((Number(e.target.value) * total) / maxRange);
    if (step > 1 && val % step !== 0) val -= val % step;
    setCurrent(val);
  };

  const memoShowButton = (
    <Button
      onClick={() => {
        isNoteVisible && setIsEditing(false);
        setIsNoteVisible(!isNoteVisible);
      }}
      layout="reader"
      startAdornment={
        <Image
          alt="memo icon"
          src={`/icons/reader/${
            isNoteVisible ? 'ic_memo_hide.svg' : 'ic_memo_show.svg'
          }`}
          width={18}
          height={18}
        />
      }
    >
      {isNoteVisible ? '메모 숨김' : '메모 보기'}
    </Button>
  );
  const zoomButton = (
    <div
      css={[
        ReaderButtonCSS,
        {
          height: '36px',
          padding: '6px 10px',
          boxSizing: 'border-box',
        },
      ]}
    >
      <button type="button" onClick={onZoomOut} css={IconCSS}>
        <Image
          alt="minus icon"
          src="/icons/ic_minus.svg"
          width={24}
          height={24}
        />
      </button>
      <p css={{ margin: 0, width: '42px' }}>{zoom * 100}%</p>
      <button type="button" onClick={onZoomIn} css={IconCSS}>
        <Image
          alt="plus icon"
          src="/icons/ic_plus.svg"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
  const pageNaviator = (
    <>
      <button type="button" onClick={onPrev} css={IconCSS}>
        <Image
          alt="left icon"
          src="/icons/ic_chevron_left.svg"
          width={24}
          height={24}
        />
      </button>
      <p css={PageCountCSS}>
        <span>{current + 1}</span> / {total}
      </p>
      <button type="button" onClick={onNext} css={IconCSS}>
        <Image
          alt="right icon"
          src="/icons/ic_chevron_right.svg"
          width={24}
          height={24}
        />
      </button>
    </>
  );
  const audioPlayer = <>{audioUrl && <AudioPlayer url={audioUrl} />}</>;

  if (!isShow) return null;
  if (isDesktop) {
    return (
      <div css={DesktopNavWrapperCSS}>
        {audioPlayer}
        <div css={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {pageNaviator}
        </div>
        {zoomButton}
        <NoteEditButton />
        {memoShowButton}
      </div>
    );
  }

  return (
    <div css={NavbarWrapperCSS}>
      <div
        css={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'end',
          gap: '12px',
          bottom: 132,
          right: 20,
        }}
      >
        {memoShowButton}
        {zoomButton}
        {audioPlayer}
      </div>

      <div css={NavbarContainerCSS}>
        <input
          css={[
            InputRangeBarCSS,
            {
              '&::-webkit-slider-runnable-track': {
                background: `linear-gradient(to right, ${
                  color.icon.primary
                } 0%, ${color.icon.primary} ${
                  ((current + 1) / total) * 100
                }%, ${color.icon.tertiary} ${((current + 1) / total) * 100}%, ${
                  color.icon.tertiary
                } 100%)`,
                height: '4px',
                borderRadius: '99px',
              },
            },
          ]}
          type="range"
          value={((current + 1) / total) * maxRange}
          min={1}
          max={maxRange}
          onChange={handleChangeRangeBar}
        />

        <div
          css={{
            marginTop: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {pageNaviator}
        </div>
      </div>
    </div>
  );
}
