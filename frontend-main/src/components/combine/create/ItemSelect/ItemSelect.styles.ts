import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';

export const NotFoundCSS = css({
  marginTop: 72,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const ContainerCSS = css({
  marginTop: 46,
});

export const HeadCSS = css({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '100%',
});

export const BodyCSS = css({
  marginTop: 12,
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '20px 6px',

  [mq.mobile]: {
    marginTop: 20,
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '40px 6px',
  },
});

export const ItemImgWrapperCSS = css({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: 266,
  background: color.background.container.charcoal,
  fontSize: 14,
  lineHeight: '130%',

  '& img': {
    borderRadius: 3.228,
    boxShadow: `-6px 8px 7.2px 0px rgba(0, 0, 0, 0.36)`,
    objectFit: 'cover',
  },
});

export const ItemTextWrapperCSS = css({
  margin: '0 6px',
});

export const ItemIndexCSS = css({
  position: 'absolute',
  padding: '10px 16px',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: 99,
  border: '1px solid #000',
  background: color.background.container.black,
  color: '#fff',
  fontSize: 20,
  fontWeight: 600,
  lineHeight: '100%',
  minWidth: 40,
  height: 40,
  boxSizing: 'border-box',
});

export const ItemInfoCSS = css({
  marginTop: 10,
  color: color.purple,
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '120%',
});

export const ItemTitleCSS = css({
  marginTop: 4,
  fontSize: 18,
  fontWeight: 600,
  lineHeight: '110%',
  color: '#fff',
});
