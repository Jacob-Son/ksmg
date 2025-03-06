import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';

export const EventsGridCSS = css({
  display: 'grid',
  marginTop: 50,
  padding: '0 20px',
  gap: 24,
  gridTemplateColumns: 'repeat(4, 1fr)',

  [mq.tablet]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  [mq.mobile]: {
    marginTop: 40,
    padding: 0,
    gap: '24px 20px',
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
});

export const ImageAndTagContainerCSS = css({
  position: 'relative',
  width: '100%',
  height: 'fit-content',
});

export const ImageWrapperCSS = css({
  position: 'relative',
  width: '100%',
  aspectRatio: '23 / 24',
  background: color.skeleton,
});

export const TagLayerCSS = (isEnd: boolean) =>
  css({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',

    ...(isEnd && {
      background: '#E7E8ED80',
    }),
  });

export const EventTagCSS = css({
  margin: '6px 6px 6px auto',
  padding: '8px 12px',
  width: 'fit-content',
  border: '1px solid #fff',
  borderRadius: '99px',
  color: '#fff',
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '100%',
});

export const EndedEventTagCSS = css({
  marginTop: 'auto',
  padding: '8px 14px 10px 14px',
  width: 'fit-content',
  background: color.background.container.black,
  color: '#fff',
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '100%',
});

export const EventNameCSS = css({
  marginTop: 12,
  fontWeight: 600,
  lineHeight: '100%',
  color: color.text.primary,
});

export const EventDurationCSS = css({
  marginTop: 8,
  color: color.text.secondary,
  fontSize: 12,
  lineHeight: '120%',
});
