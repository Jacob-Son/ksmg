import { css } from '@emotion/react';
import { IBadgeProps } from './Badge';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';

export const BadgeCSS = (type: IBadgeProps['type']) =>
  css({
    ...(type === 'new' && {
      background: '#fff',
      color: color.black[900],
    }),
    ...(type === 'discount' && {
      background: color.green.main,
      color: color.text.neutral[1][100],
    }),
    padding: '0px 8px',
    height: 25,
    borderRadius: 4,
    fontFeatureSettings: "'clig' off, 'liga' off",
    fontFamily: '"Inter", sans-serif',
    fontSize: 18,
    fontWeight: 700,
    lineHeight: '25px',
    boxSizing: 'border-box',

    [mq.mobile]: {
      height: 27,
    },
  });
