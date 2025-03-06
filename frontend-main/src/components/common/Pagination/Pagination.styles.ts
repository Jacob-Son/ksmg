import { css } from '@emotion/react';
import { color } from 'src/styles/colors';

export const PaginationCSS = css({
  display: 'flex',
  justifyContent: 'center',
  gap: 18,

  '& span, & button': {
    border: 'none',
    background: 'none',
    height: 'fit-content',
    fontFamily: "'Source Serif 4', serif",
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '100%',
    color: color.text.secondary,
  },
});

export const PaginationButtonCSS = ({
  isCurrent,
  layout,
}: {
  isCurrent: boolean;
  layout: 'normal' | 'dark';
}) =>
  css({
    marginTop: 2,
    ...(layout === 'dark' && {
      color: color.text.secondary,
    }),
    ...(isCurrent && {
      color: `${layout === 'dark' ? '#fff' : color.text.primary} !important`,
    }),
  });
