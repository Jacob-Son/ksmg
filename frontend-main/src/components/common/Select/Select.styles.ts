import { css } from '@emotion/react';
import { color } from 'src/styles/colors';

export const SelectWrapperCSS = css({
  position: 'relative',
});

export const SelectCSS = css({
  position: 'relative',
  height: 68,
  padding: '20px',
  width: '100%',
  background: '#fff',
  boxSizing: 'border-box',
  border: `1px solid ${color.border.primary}`,
  borderRadius: 8,
  fontSize: 16,
  fontWeight: 600,
  lineHeight: '100%',
  letterSpacing: '-0.165px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  wordBreak: 'keep-all',
  textAlign: 'left',

  OAppearance: 'none',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  appearance: 'none',

  '& span': {
    color: color.text.secondary,
  },

  '&:focus': {
    outline: 'none',
  },
});

export const SelectOptionsCSS = css({
  position: 'absolute',
  bottom: 0,
  left: 0,
  zIndex: 2,
  transform: 'translateY(100%)',
  listStyleType: 'none',
  boxSizing: 'border-box',
  padding: 0,
  width: '100%',
  borderRadius: 10,
  overflow: 'hidden',
  background: color.background.container.primary,
  maxHeight: 170,
  overflowY: 'auto',

  '& li': {
    padding: '16px 20px',
    fontWeight: 600,
    lineHeight: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    wordBreak: 'keep-all',
    '&[aria-selected="true"], &:hover': {
      background: color.background.container.gray,
      color: color.purple,
    },
  },
});

export const EndIconCSS = css({
  position: 'absolute',
  right: 16,
  top: '50%',
  transform: 'translateY(-50%)',
});
