import { useResponsive } from 'src/hooks/common/useResponsive';
import { HeaderCSS, HeaderTitleCSS } from './Header.styles';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { IconButtonCSS } from 'src/components/common/Button/Button.styles';
import React from 'react';
import NoteEditButton from '../NoteEditButton';
import { useNotesStore } from 'src/stores/notes/notes.store';
import { css } from '@emotion/react';

interface IProps {
  title: string;
  children?: React.ReactNode;
}

export default function Header({ title, children }: IProps) {
  const router = useRouter();
  const { isDesktop } = useResponsive();
  const { isEditing, setIsEditing } = useNotesStore((state) => ({
    isEditing: state.isEditing,
    setIsEditing: state.setIsEditing,
  }));
  return (
    <header css={HeaderCSS}>
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {!isDesktop && (
          <button
            type="button"
            css={IconButtonCSS}
            onClick={() => {
              if (isEditing) {
                setIsEditing(false);
                return;
              }
              router.push('/library');
            }}
          >
            <Image
              alt="back icon"
              src="/icons/ic_chevron_left.svg"
              width={24}
              height={24}
            />
          </button>
        )}
        <h1 css={HeaderTitleCSS}>
          {!isDesktop && isEditing ? '메모 편집' : title}
        </h1>
        {!isDesktop && (
          <NoteEditButton
            css={css({
              ...(isEditing && { opacity: 0, pointerEvents: 'none' }),
            })}
          />
        )}
      </div>
      {children}
    </header>
  );
}
