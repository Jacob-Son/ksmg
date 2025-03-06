import React, { useEffect, useRef, useState } from 'react';
import {
  DraggingNoteItemWrapperCSS,
  NoteItemWrapperCSS,
  NoteItemsContainerCSS,
} from './Notes.styles';
import { useNotesStore } from 'src/stores/notes/notes.store';
import NoteItem from './NoteItem';
import { useToast } from 'src/stores/toast/toast.store';
import { ToastPosition } from 'src/stores/toast/toast.types';
import { useResponsive } from 'src/hooks/common/useResponsive';
import { css } from '@emotion/react';
import Image from 'next/image';
import { returnBetween } from 'src/utils/format';
import { INote } from '~/types/note';
import useNote from 'src/hooks/reader/useNote';
import useAccount from 'src/hooks/common/useAccount';

interface IMemos {
  bookId: number;
  zoom?: number;
  currentPage: number;
  position: 'left' | 'right';
}

export const preventDefault = (e) => {
  e.preventDefault();
};

export default function Notes({ bookId, currentPage, position }: IMemos) {
  const notesContainerRef = useRef(null);
  const { isDesktop } = useResponsive();
  const { showToast } = useToast((state) => ({ showToast: state.showToast }));
  const { notes, isEditing, addNote, updateNote, deleteNote, setNotes } =
    useNotesStore((state) => ({
      notes: state.notes,
      isEditing: state.isEditing,
      addNote: state.addNote,
      updateNote: state.updateNote,
      deleteNote: state.deleteNote,
      setNotes: state.setNotes,
    }));
  const [temporaryNote, setTemporaryNote] = useState<Partial<INote> | null>(
    null,
  );
  const [isNoteAddable, setIsNoteAddable] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [draggingNote, setDraggingNote] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const noteList = notes?.[Number(bookId || 0)]?.[currentPage] || [];

  const { address } = useAccount();
  const { notes: noteData } = useNote(bookId, address, currentPage);

  useEffect(() => {
    if (noteData) {
      setNotes(noteData);
    }
  }, [noteData]);

  const handleClickNotesContainter = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isEditing) return;
    if (!isNoteAddable) return;
    if (temporaryNote) {
      setTemporaryNote(null);
      return;
    }
    if (isDragging) {
      setIsDragging(false);
      return;
    }
    setTemporaryNote({
      noteId: noteList.length + 1,
      bookId: bookId,
      pageNumber: currentPage,
      notePositionX: e.nativeEvent.offsetX / e.currentTarget.offsetWidth,
      notePositionY: e.nativeEvent.offsetY / e.currentTarget.offsetHeight,
      noteContent: '',
    });
  };

  const onMoveStart = (e) => {
    if (e.target !== e.currentTarget) {
      const noteId = e.target.getAttribute('note-id');
      if (noteId) {
        setDraggingNote(Number(noteId));
        setIsNoteAddable(false);
      }
      setIsDragging(true);
    } else {
      setIsDragging(false);
    }
  };
  const onMove = (x, y, e) => {
    const skeleton = document.querySelectorAll<HTMLDivElement>(
      '.dragging-note-item-skeleton',
    );
    const rect = e.currentTarget.getBoundingClientRect();

    let posXRatio = (x - rect.left) / rect.width;
    let posYRatio = (y - rect.top) / rect.height;
    if (posXRatio < 0 || posXRatio > 1 || posYRatio < 0 || posYRatio > 1) {
      posXRatio = returnBetween(posXRatio, 0, 1);
      posYRatio = returnBetween(posYRatio, 0, 1);
    }
    setCurrentPosition({
      x: posXRatio,
      y: posYRatio,
    });
    const posX =
      posXRatio * rect.width + (position === 'left' ? 0 : rect.width);
    const posY = posYRatio * rect.height;
    skeleton.forEach((x) => {
      x.style.left = posX + 'px';
      x.style.bottom = `calc(100% - ${posY}px)`;
      x.style.display = 'flex';
    });
  };
  const onMoveEnd = (x, y) => {
    const note = noteList.find((x) => x.noteId === draggingNote);

    // 클릭하자마자 일어나는 mouseup 또는 touchend 이벤트 방지
    if (
      Math.abs(currentPosition.x - x) <= 0.01 &&
      Math.abs(currentPosition.y - y) <= 0.01 &&
      note
    ) {
      updateNote?.({
        ...note,
        notePositionX: x,
        notePositionY: y,
      } as INote);
    }
    setDraggingNote(null);
    setIsNoteAddable(true);
    setCurrentPosition(null);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isEditing) return;
    e.stopPropagation();
    onMoveStart(e);
    onMove(e.touches[0].clientX, e.touches[0].clientY, e);
  };
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isEditing) return;
    if (isDragging) onMove(e.touches[0].clientX, e.touches[0].clientY, e);
  };
  const handleTouchEnd = (e) => {
    if (!isEditing) return;
    const skeleton = document.querySelectorAll<HTMLDivElement>(
      '.dragging-note-item-skeleton',
    );

    skeleton.forEach((x) => {
      const posX =
        (x.offsetLeft - e.currentTarget.offsetLeft) /
        e.currentTarget.offsetWidth;
      const posY =
        (x.offsetTop + x.offsetHeight) / e.currentTarget.offsetHeight;
      x.style.display = 'none';
      onMoveEnd(posX, posY);
    });
  };
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!isEditing) return;
    onMoveStart(e);
    onMove(e.clientX, e.clientY, e);
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!isEditing) return;
    // 마우스 클릭한 상태(드래그)에서만 이벤트 호출
    if (isDragging) onMove(e.clientX, e.clientY, e);
  };
  const handleMouseUp = (e) => {
    if (!isEditing) return;
    onMoveEnd(
      e.nativeEvent.offsetX / e.currentTarget.offsetWidth,
      e.nativeEvent.offsetY / e.currentTarget.offsetHeight,
    );
  };
  const handleMouseLeave = (e) => {
    if (!isEditing) return;
    if (
      (isDragging &&
        e.nativeEvent.offsetX > e.currentTarget.offsetWidth &&
        position === 'left') ||
      (e.nativeEvent.offsetX < 0 && position === 'right')
    ) {
      showToast('메모 이동은 같은 페이지 내에서만 가능합니다.', {
        ...(isDesktop && {
          position: ToastPosition.TOP,
        }),
      });
    }
  };

  React.useEffect(() => {
    if (isDragging && document) {
      document.addEventListener('touchmove', preventDefault, {
        passive: false,
      });
      return () => {
        document.removeEventListener('touchmove', preventDefault);
      };
    }
  }, [isDragging]);

  return (
    <>
      <div
        ref={notesContainerRef}
        css={[
          NoteItemsContainerCSS(isEditing),
          css({ ...(isDragging && { cursor: 'grabbing !important' }) }),
        ]}
        note-position={position}
        onClick={handleClickNotesContainter}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {isNoteAddable && temporaryNote && (
          <NoteItem
            note={temporaryNote}
            type="add"
            onAddNote={(note) => {
              addNote(note);
              setTemporaryNote(null);
              showToast('성공적으로 저장 되었습니다.', {
                ...(isDesktop && {
                  position: ToastPosition.TOP,
                }),
              });
            }}
            onCancel={() => setTemporaryNote(null)}
          />
        )}
        {noteList.map((item) => (
          <NoteItem
            key={`book-${item.bookId} page-${item.pageNumber} note-${item.noteId}`}
            note={item}
            type="update"
            isDragging={draggingNote === item.noteId}
            setIsNoteAddable={(val) => {
              setIsNoteAddable(val);
              setTemporaryNote(null);
            }}
            onUpdateNote={updateNote}
            onDeleteNote={deleteNote}
          />
        ))}
      </div>
      {draggingNote && (
        <div
          className="dragging-note-item-skeleton"
          css={[
            NoteItemWrapperCSS,
            DraggingNoteItemWrapperCSS,
            { transition: 'none', display: 'none' },
          ]}
        >
          <div className="image-wrapper">
            <Image
              alt="pen"
              src="/icons/reader/ic_pen_bold.svg"
              width={28}
              height={28}
            />
          </div>
        </div>
      )}
    </>
  );
}
