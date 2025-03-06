import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';

export const PriceInfosGridCSS = css({
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  padding: '31px 0',
  gap: '18px 31px',
  fontSize: 18,
  fontWeight: 600,
  lineHeight: '100%',
  letterSpacing: '-0.165px',
  borderTop: `2px solid ${color.border.primary}`,
  borderBottom: `2px solid ${color.border.primary}`,

  '& span': {
    color: color.purple,
    fontSize: 22,
  },

  [mq.mobile]: {
    padding: '28px 0 0 0',
    gap: '24px 31px',
    borderBottom: 'none',
  },
});

export const TimeInfosFlexCSS = css({
  display: 'flex',
  flexDirection: 'column',
  marginTop: 31,
  gap: 12,

  [mq.mobile]: {
    marginTop: 30,
    gap: 10,
  },
});

export const TimeInfoCSS = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 12,
  padding: '20px 12px',
  background: color.background.container.primary,
  borderRadius: 10,
  fontSize: 18,
  lineHeight: '140%',
  letterSpacing: '-0.165px',

  '& p:not(:first-of-type)': {
    color: color.purple,
  },

  [mq.mobile]: {
    padding: '16px 12px',
  },
});

export const PriceInfoCSS = css({
  textAlign: 'right',
});
