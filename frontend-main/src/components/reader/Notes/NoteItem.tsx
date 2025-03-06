import React, { useState } from 'react';
import { TNotesStore } from 'src/stores/notes/notes.types';
import { NoteItemWrapperCSS } from './Notes.styles';
import NoteInput from './NoteInput';
import { useToast } from 'src/stores/toast/toast.store';
import { useResponsive } from 'src/hooks/common/useResponsive';
import { ToastPosition } from 'src/stores/toast/toast.types';
import Image from 'next/image';
import { css } from '@emotion/react';
import { INote } from '~/types/note';

interface INoteItemProps {
  note?: Partial<INote>;
  type: 'add' | 'update';
  isDragging?: boolean;
  setIsNoteAddable?: (val: boolean) => void;
  onAddNote?: TNotesStore['addNote'];
  onUpdateNote?: TNotesStore['updateNote'];
  onDeleteNote?: TNotesStore['deleteNote'];
  onCancel?: () => void;
}

export default function NoteItem({
  note,
  type,
  isDragging = false,
  setIsNoteAddable,
  onAddNote,
  onUpdateNote,
  onDeleteNote,
  onCancel,
}: INoteItemProps) {
  const { isDesktop } = useResponsive();
  const { showToast } = useToast((state) => ({ showToast: state.showToast }));
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <div
        css={css({
          position: 'absolute',
          padding: 20,
          cursor: 'pointer',
          ...(isDragging && {
            opacity: 0,
            cursor: 'grabbing',
          }),
          bottom: `calc(${(1 - note?.notePositionY) * 100}% - 20px)`,
          left: `calc(${note?.notePositionX * 100}% - 20px)`,
          ...(type === 'add' && {
            transition: 'none',
          }),
        })}
        note-type={type}
        {...(note?.noteId && {
          'note-id': note?.noteId,
        })}
        onClick={stopPropagation}
        onMouseOver={(e) => {
          e.stopPropagation();
          e.preventDefault();
          if (type === 'update') setIsNoteAddable?.(false);
        }}
        onMouseOut={(e) => {
          e.stopPropagation();
          e.preventDefault();
          if (type === 'update') setIsNoteAddable?.(true);
        }}
      >
        <div css={NoteItemWrapperCSS}>
          <div
            className="image-wrapper"
            {...(note?.noteId && {
              'note-id': note?.noteId,
            })}
            onClick={(e) => {
              e.stopPropagation();
              setIsEditModalOpen(true);
            }}
          >
            <Image
              alt="pen"
              src="/icons/reader/ic_pen_bold.svg"
              {...(note?.noteId && {
                'note-id': note?.noteId,
              })}
              width={18}
              height={18}
            />
          </div>
        </div>
      </div>

      {type === 'add' && (
        <NoteInput
          note={note}
          type={type}
          onCancel={onCancel}
          onSave={onAddNote}
        />
      )}
      {type === 'update' && isEditModalOpen && (
        <NoteInput
          note={note}
          type={type}
          onCancel={() => setIsEditModalOpen(false)}
          onSave={(note) => {
            onUpdateNote?.(note);
            setIsEditModalOpen(false);
            showToast('성공적으로 저장 되었습니다.', {
              ...(isDesktop && {
                position: ToastPosition.TOP,
              }),
            });
          }}
          onDelete={() => {
            onDeleteNote?.(note as INote);
            setIsEditModalOpen(false);
          }}
        />
      )}
    </>
  );
}
