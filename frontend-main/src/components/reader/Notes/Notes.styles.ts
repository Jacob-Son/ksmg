import { css } from '@emotion/react';
import { breakpoints, mediaQuery } from 'src/styles/mediaQuery';
import {
  mobileAspectRatio,
  normalAspectRatio,
  ratio,
} from '../BookReader.styles';
import { color } from 'src/styles/colors';
import { gradient } from 'src/styles/gradient';

export const NotesWrapperCSS = (isEditing, zoom) =>
  css({
    position: 'relative',
    transition: '0.9s ease-in-out',
    transitionProperty: 'transform, top, left, width',
    aspectRatio: normalAspectRatio,
    width: `min(${80 * ratio * zoom}vh, 80%)`,
    ...(isEditing && {
      background: gradient.background.note.editing,
      borderRadius: `${11 * zoom}px`,
    }),
    [mediaQuery.down(breakpoints.tb_768)]: {
      aspectRatio: mobileAspectRatio,

      ...(isEditing && {
        background: color.background.note.editing,
      }),
    },
  });

export const NoteItemsContainerCSS = (isEditing: boolean) =>
  css({
    aspectRatio: mobileAspectRatio,
    position: 'absolute',
    top: 0,
    width: '50%',

    '&[note-position="left"]': {
      left: 0,
    },
    '&[note-position="right"]': {
      left: '50%',
    },
    ...(isEditing && {
      '&:hover': {
        cursor: 'url(/imgs/reader/img_mouse_cursor.png) 0 21, auto',
      },
    }),
    [mediaQuery.down(breakpoints.tb_768)]: {
      width: '100%',
    },
  });

export const NoteItemWrapperCSS = css({
  borderRadius: '18px 18px 18px 2px',
  width: '34px',
  height: '34px',
  boxSizing: 'border-box',
  background: 'white',
  boxShadow: '0px 3px 4px 0px rgba(0, 0, 0, 0.25)',
  transformOrigin: '0% 0%',
  transition: '0.1s ease-in-out',
  transitionProperty:
    'transform, width, height, border-radius, box-shadow, background',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer !important',

  '& .image-wrapper, & img': {
    transition: '0.1s ease-in-out',
    transitionProperty: 'width, height, filter',
    userSelect: 'none',
  },
  '& .image-wrapper': {
    width: '28px',
    height: '28px',
    borderRadius: '99px',
    background: color.background.default,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '& img': {
    width: '18px',
    height: '18px',
    filter: 'brightness(0)',
    userSelect: 'none',
  },
  '& p': {
    wordBreak: 'break-all',
  },
});

export const DraggingNoteItemWrapperCSS = css({
  position: 'absolute',
  borderRadius: '29px 29px 29px 3px',
  width: '54px',
  height: '54px',
  boxShadow: '0px 4.76471px 6.35294px 0px rgba(0, 0, 0, 0.25)',
  background: color.icon.primary,
  '& .image-wrapper': {
    width: '28px',
    height: '28px',
    background: 'transparent',
  },
  '& img': {
    width: '29px',
    height: '29px',
    filter: 'brightness(1)',
  },
});
