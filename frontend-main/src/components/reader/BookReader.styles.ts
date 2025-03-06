import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { breakpoints, mediaQuery, mq } from 'src/styles/mediaQuery';

export const BookReaderWrapperCSS = css({
  position: 'absolute',
  top: 0,
  left: 0,
  paddingBottom: '120px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  [mediaQuery.between(684, breakpoints.tb_768)]: {
    paddingTop: '60px',
  },
  [mq.desktop]: {
    paddingTop: '30px',
    paddingBottom: '0',
  },
});

export const ratio = Math.sqrt(2);
export const mobileAspectRatio = `1 / ${ratio}`;
export const normalAspectRatio = `${ratio} / 1`;

export const BookCSS = (isTransitionActive: boolean) =>
  css({
    position: 'absolute',
    display: 'flex',
    width: `min(${80 * ratio}vh, 80%)`,
    borderRadius: '11px',
    boxShadow: '0px 0px 10.97419px 0px rgba(0, 0, 0, 0.12)',
    perspective: '4000px',

    '& .book__page': {
      position: 'absolute',
      background: '#F5F5F5',
      aspectRatio: mobileAspectRatio,
      transform: 'rotateY(0deg)',
      transition: isTransitionActive
        ? '0.9s cubic-bezier(0.645, 0.045, 0.355, 1)'
        : 'none',
      transitionProperty: 'transform, z-index, opacity',
      overflow: 'hidden',

      '&[page-status="read"]': {
        zIndex: 0,
      },
      '&[page-status="current"]': {
        zIndex: 1,
      },
    },
    [mediaQuery.down(breakpoints.tb_768)]: {
      aspectRatio: mobileAspectRatio,
      '& .book__page': {
        top: 0,
        left: 0,
        width: '100%',
        borderRadius: '11px',
        transformOrigin: '0% 0%',

        '&[page-status="read"]': {
          opacity: 0,
          transform: 'rotateY(-180deg)',
        },
      },
    },
    [mediaQuery.up(breakpoints.tb_768)]: {
      aspectRatio: normalAspectRatio,
      '& .book__page': {
        position: 'absolute',
        top: 0,
        left: '50%',
        width: '50%',
        transformOrigin: '0% 0%',

        '&--left': {
          left: 0,
          transform: 'rotateY(0deg)',
          transformOrigin: '100% 0%',
          borderTopLeftRadius: '11px',
          borderBottomLeftRadius: '11px',
        },
        '&--right': {
          borderTopRightRadius: '11px',
          borderBottomRightRadius: '11px',
        },
        '&--left[page-status="unread"]': {
          left: 0,
          transform: 'rotateY(180deg)',
          transformOrigin: '100% 0%',
        },
        '&--right[page-status="read"]': {
          transform: 'rotateY(-180deg)',
        },
      },
    },
  });

export const NoteSectionCSS = (zoom: number) =>
  css({
    position: 'absolute',
    transformOrigin: '0% 0%',
    transition: '0.9s ease-in-out',
    transitionProperty: 'width, height, padding',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: `${zoom * 100}vw`,
    height: `${zoom * 100}vh`,

    [mediaQuery.between(684, breakpoints.tb_768)]: {
      paddingTop: `${60 * zoom}px`,
    },
    [mq.desktop]: {
      paddingTop: `${30 * zoom}px`,
    },
  });

export const CopyrightWarningCSS = css`
  position: absolute;
  margin-top: 24px;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  width: 100%;
  color: ${color.text.secondary};
  font-size: 14px;
  line-height: 17px;

  ${mediaQuery.up(breakpoints.mb_600)} {
    & br {
      display: none;
    }
  }
  ${mq.mobile} {
    margin-top: 40px;
  }
  ${mq.tablet} {
    margin-top: 72px;
  }
`;
