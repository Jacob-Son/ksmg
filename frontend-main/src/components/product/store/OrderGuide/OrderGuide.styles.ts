import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { contentMaxWidth } from '../store.styles';
import { mq } from 'src/styles/mediaQuery';

export const OrderGuidesFlexCSS = css({
  margin: '24px auto 200px auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
  maxWidth: contentMaxWidth,
  width: '100%',
  color: color.text.primary,
  fontSize: 14,
  lineHeight: '120%',
  letterSpacing: '-0.165px',
  paddingTop: 24,
  borderTop: `1px solid ${color.border.primary}`,

  [mq.mobile]: {
    width: 'calc(100% - 40px)',
    margin: '24px 20px 200px 20px',
    boxSizing: 'border-box',
  },
});

export const OrderGuideContainerCSS = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
});

export const OrderGuideTitleCSS = css({
  fontWeight: 600,
  lineHeight: '100%',
  paddingBottom: 8,
});
