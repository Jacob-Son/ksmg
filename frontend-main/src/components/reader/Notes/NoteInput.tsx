import ModalPortal from 'src/components/common/Portal';
import { useResponsive } from 'src/hooks/common/useResponsive';
import {
  MbNoteInputHeaderCSS,
  MbNoteInputWrapperCSS,
  SaveButtonCSS,
  TabletNoteInputHeaderCSS,
  TabletNoteInputWrapperCSS,
  TextareaWrapperCSS,
} from './NoteInput.styles';
import { HeaderTitleCSS } from '../Header/Header.styles';
import Image from 'next/image';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { IconButtonCSS } from 'src/components/common/Button/Button.styles';
import AlertModal from 'src/components/common/Modal/AlertModal';
import { color } from 'src/styles/colors';
import { AlertModalBackdropCSS } from 'src/components/common/Modal/AlertModal.styles';
import { noteInputMaxHeight, noteInputMaxWidth } from './NoteInput.constants';
import { css } from '@emotion/react';
import { INote } from '~/types/note';
import useAccount from 'src/hooks/common/useAccount';

interface INoteInputProps {
  note?: Partial<INote>;
  type: 'add' | 'update';
  onCancel: () => void;
  onSave: (note: INote) => void;
  onDelete?: () => void;
}

const NoteInput = ({
  note,
  type,
  onCancel,
  onSave,
  onDelete,
}: INoteInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { isMobile, isDesktop } = useResponsive();
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [temp, setTemp] = useState('');
  const [isTextareaAvailable, setIsTextareaAvailable] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const isModalOpen = isCancelModalOpen || isDeleteModalOpen;
  const { address } = useAccount();

  const handleClickBackdrop = () => {
    if (
      // 1. 변경 도중 종료
      // 2. 신규 작성 도중 종료
      textareaRef?.current?.value &&
      ((type === 'update' &&
        textareaRef?.current?.value !== note?.noteContent) ||
        type === 'add')
    ) {
      setIsCancelModalOpen(true);
    } else {
      onCancel();
    }
  };
  const handleDelete = () => setIsDeleteModalOpen(true);
  const handleSave = (e) => {
    e.stopPropagation();
    onSave({
      noteId: note?.noteId,
      bookId: note?.bookId,
      userAddress: address,
      pageNumber: note.pageNumber,
      noteContent: textareaRef?.current?.value,
      notePositionX: note?.notePositionX,
      notePositionY: note?.notePositionY,
      createdAt: new Date(),
    });
  };

  useEffect(() => {
    if (note.noteContent) {
      textareaRef.current.value = note.noteContent;
    }
  }, [note, isMobile]);

  useLayoutEffect(() => {
    const comps = document.querySelectorAll<HTMLDivElement>(
      type === 'add' ? '[note-type="add"]' : `[note-id="${note.noteId}"]`,
    );

    comps.forEach((ele) => {
      const rect = ele.getBoundingClientRect();
      const posX =
        rect.x + 50 + noteInputMaxWidth > window.innerWidth - 40
          ? window.innerWidth - 40 - noteInputMaxWidth
          : rect.x + 50;
      const posY =
        rect.y + noteInputMaxHeight > window.innerHeight - 40
          ? window.innerHeight - 40 - noteInputMaxHeight
          : rect.y;
      setPosition({ x: posX, y: posY });
    });
  }, [note, type]);

  const saveButton =
    type === 'update' && !isTextareaAvailable ? (
      <button
        type="button"
        css={SaveButtonCSS}
        onClick={() => setIsTextareaAvailable(true)}
      >
        수정
      </button>
    ) : (
      <button type="button" css={SaveButtonCSS} onClick={handleSave}>
        저장
      </button>
    );

  const textareaComp = (
    <textarea
      ref={textareaRef}
      placeholder="메모를 입력해주세요"
      onChange={(e) => {
        setTemp(e.target.value);
      }}
      maxLength={500}
      css={css({
        ...(type === 'update' &&
          !isTextareaAvailable && {
            pointerEvents: 'none',
          }),
      })}
    />
  );

  const trashButton = (
    <div
      css={{
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <button
        type="button"
        css={[IconButtonCSS, { width: 'fit-content' }]}
        onClick={handleDelete}
      >
        <Image
          alt="delete icon"
          src="/icons/ic_trash.svg"
          width={24}
          height={24}
        />
      </button>
    </div>
  );

  return (
    <>
      {isMobile ? (
        <ModalPortal>
          <div
            css={MbNoteInputWrapperCSS}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div css={MbNoteInputHeaderCSS}>
              <button
                type="button"
                css={IconButtonCSS}
                onClick={handleClickBackdrop}
              >
                <Image
                  alt="back icon"
                  src="/icons/ic_chevron_left.svg"
                  width={24}
                  height={24}
                />
              </button>
              <p css={HeaderTitleCSS}>독서 메모</p>
              {saveButton}
            </div>
            <div css={{ padding: '16px 20px' }}>
              <div css={TextareaWrapperCSS}>
                {textareaComp}
                <p>{textareaRef?.current?.value?.length || temp.length}/500</p>
              </div>
            </div>
            {type === 'update' && trashButton}
          </div>
        </ModalPortal>
      ) : (
        <ModalPortal>
          <div
            css={[
              AlertModalBackdropCSS,
              {
                ...(isDesktop && { background: 'transparent' }),
                ...(isModalOpen && { display: 'none' }),
              },
            ]}
            onClick={handleClickBackdrop}
          />
          <div
            css={[
              TabletNoteInputWrapperCSS,
              {
                ...(isDesktop && {
                  left: position.x,
                  top: position.y,
                  transform: 'none',
                }),
                ...(isModalOpen && { display: 'none' }),
              },
            ]}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div css={TabletNoteInputHeaderCSS}>
              <p>독서노트</p>
              {saveButton}
            </div>
            <div
              css={[
                TextareaWrapperCSS,
                {
                  padding: '20px 20px 30px 20px',
                  height: '438px',
                  background: 'transparent',
                  '& textarea': { background: 'transparent' },
                },
              ]}
            >
              {textareaComp}
              <div
                css={{
                  marginTop: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {type === 'update' && trashButton}
                <p
                  css={{
                    marginLeft: 'auto',
                    fontSize: '14px !important',
                    fontWeight: '300 !important',
                  }}
                >
                  {textareaRef?.current?.value?.length || temp.length}/500
                </p>
              </div>
            </div>
          </div>
        </ModalPortal>
      )}
      <AlertModal
        title="편집 취소"
        description="메모 편집을 취소하시겠습니까?\n변경 내용은 저장되지 않습니다"
        isShow={isCancelModalOpen}
        onCancel={() => {
          setIsCancelModalOpen(false);
        }}
        onConfirm={onCancel}
      />
      {type === 'update' && (
        <AlertModal
          title="메모 삭제"
          description="메모를 삭제하시겠습니까?\n삭제한 후에는 복구할 수 없습니다"
          isShow={isDeleteModalOpen}
          confirmText={<span css={{ color: color.red.main }}>삭제</span>}
          onCancel={() => {
            setIsDeleteModalOpen(false);
          }}
          onConfirm={onDelete}
        />
      )}
    </>
  );
};

export default NoteInput;
