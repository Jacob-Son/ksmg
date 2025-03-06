import { css } from '@emotion/react';
import { color } from 'src/styles/colors';

export const TableCSS = css({
  marginTop: 40,
  display: 'table',
  width: '100%',
  textAlign: 'center',
  borderCollapse: 'collapse',

  '& th, & td': {
    padding: '14px 0',
    borderTop: `1px solid ${color.line.primary}`,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '130%',
  },
  '& th': {
    width: '50%',
  },
  '& td': {
    borderBottom: `1px solid ${color.line.primary}`,

    '&:first-of-type': {
      borderRight: `1px solid ${color.line.primary}`,
    },
  },
});

export const NotificationListCSS = css({
  marginTop: 40,
  display: 'flex',
  flexDirection: 'column',
  listStyleType: '"·  "',
  paddingLeft: 18,
  gap: 10,

  '& li': {
    color: color.text.secondary,
    fontSize: 14,
    lineHeight: '120%',
  },
  '& li:first-of-type': {
    color: color.text.primary,
  },
});
