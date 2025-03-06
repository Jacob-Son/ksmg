import React from 'react';
import { IconButtonCSS } from '../common/Button/Button.styles';
import Image from 'next/image';
import { useNotesStore } from 'src/stores/notes/notes.store';
import { useToast } from 'src/stores/toast/toast.store';
import { useResponsive } from 'src/hooks/common/useResponsive';
import { ToastPosition } from 'src/stores/toast/toast.types';

export default function NoteEditButton(props: { [key: string]: unknown }) {
  const { isDesktop } = useResponsive();
  const { showToast } = useToast((state) => ({ showToast: state.showToast }));
  const { isEditing, setIsEditing, setIsNoteVisible } = useNotesStore(
    (state) => ({
      isEditing: state.isEditing,
      setIsEditing: state.setIsEditing,
      setIsNoteVisible: state.setIsNoteVisible,
    }),
  );
  return (
    <button
      type="button"
      css={IconButtonCSS}
      onClick={() => {
        if (!isEditing) {
          showToast('원하는 위치를 눌러 메모를 남겨보세요.', {
            ...(isDesktop && {
              position: ToastPosition.TOP,
            }),
          });
        }
        setIsEditing(!isEditing);
        setIsNoteVisible(true);
      }}
      {...props}
    >
      <Image
        alt="memo icon"
        src="/icons/reader/ic_memo.svg"
        width={24}
        height={24}
      />
    </button>
  );
}
