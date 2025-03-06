import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';

export const CombinationsGridCSS = css({
  marginTop: 72,
  marginBottom: 48,
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '14px 10px',

  [mq.mobile]: {
    marginTop: 0,
    gridTemplateColumns: 'repeat(1, 1fr)',
  },
});

export const CombinationItemContainerCSS = css({
  padding: '20px 10px 12px 10px',
  borderRadius: 8,
  background: color.background.container.charcoal,
});

export const ItemInfoFlexCSS = css({
  display: 'flex',
  gap: 11,

  '& img': {
    margin: '0 15px 22.5px 15px',
    boxShadow: '-4px 4px 4.2px 0px rgba(0, 0, 0, 0.15)',
  },
});

export const ItemNameCSS = css({
  fontSize: 18,
  fontWeight: 600,
  lineHeight: '110%',
  color: '#fff',
});

export const ItemChildrenCSS = css({
  fontSize: 14,
  lineHeight: '120%',
  color: color.text.secondary,
});

export const ItemTextSectionCSS = css({
  padding: '6px 0',
  marginBottom: 21,
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
});

export const ItemStatusFlexCSS = css({
  display: 'flex',
  gap: 6,

  '& > div': {
    borderWidth: 1,
    borderStyle: 'solid',
    padding: '4px 8px',
    borderRadius: 99,
    fontSize: 12,
    lineHeight: '120%',
    color: '#fff',
  },
});

export const ItemButtonSectionCSS = css({
  display: 'flex',
  justifyContent: 'center',
  borderTopWidth: '1px',
  borderTopStyle: 'solid',
  height: 42,
  boxSizing: 'border-box',
});

export const ItemButtonCSS = css({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  padding: 10,
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '100%',
  paddingTop: 18,
  color: '#fff',
  textDecoration: 'none',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
});
