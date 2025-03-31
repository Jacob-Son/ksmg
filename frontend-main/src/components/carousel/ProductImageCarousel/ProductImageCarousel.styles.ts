import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';

export const ProductImageCarouselContainerCSS = css({
  position: 'relative',
  overflowX: 'hidden',
  width: '100%',
  height: '100%',
  borderRadius: '8px',
  // aspectRatio: `1 / ${Math.sqrt(2)}`,
  boxShadow: '0px 1px 4px 1px rgba(0, 0, 0, 0.25)',
});

export const ImagesWrapperCSS = css({
  display: 'flex',
  overflow: 'visible',
  width: '100%',
  height: '100%',
  transition: 'transform 0.3s ease-in-out',
});

export const ImageCSS = css({
  position: 'relative',
  width: '100%',
  height: 'auto',
  flexShrink: 0,
  background: color.background.container.image,
});

export const ArrowButtonCSS = (type: 'left' | 'right') => [
  css({
    position: 'absolute',
    padding: 8,
    background: '#fff',
    border: 'none',
    borderRadius: '99px',
    width: '40px',
    height: '40px',
    boxShadow: '0px 8px 16px 0px rgba(0, 0, 0, 0.04)',
    top: '50%',
    transform: 'translateY(-50%)',
  }),
  {
    [type]: 38,
    [mq.smTablet]: {
      [type]: 16,
    },
  },
];

export const CarouselIndexCSS = css({
  position: 'absolute',
  bottom: '16px',
  left: '50%',
  transform: 'translateX(-50%)',
  padding: '8px 14px',
  background: 'rgba(0, 0, 0, 0.30)',
  backdropFilter: 'blur(10px)',
  borderRadius: '99px',
  color: '#fff',
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: '100%',
  letterSpacing: '-0.165px',
});
