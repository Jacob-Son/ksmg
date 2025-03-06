import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { breakpoints, mediaQuery, mq } from 'src/styles/mediaQuery';

export const TabsFlexCSS = css({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  padding: 0,
  listStyleType: 'none',

  '& li': {
    cursor: 'pointer',
  },
  [mediaQuery.up(breakpoints.mb_600)]: {
    '& li': {
      padding: '10px 10px 14px 4px',
      gap: 8,
      display: 'flex',
      alignItems: 'center',
      fontWeight: 600,
      lineHeight: '100%',
      color: color.text.secondary,

      '&[aria-current="true"]': {
        paddingBottom: 12,
        color: '#fff',
        borderBottom: `2px solid ${color.line.primary}`,
      },
    },
  },

  [mq.mobile]: {
    gap: 0,
    background: '#272727',
    borderRadius: 10,

    '& li': {
      flex: 1,
      padding: '12px 16px 14px 16px',
      gap: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontSize: 14,
      lineHeight: '120%',
      color: '#fff',
    },
  },
});
