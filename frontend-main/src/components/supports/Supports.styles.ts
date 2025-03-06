import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';

export const HeadCSS = css({
  display: 'flex',
  flexDirection: 'column',
  padding: '0 16px',
  gap: 12,

  [mq.mobile]: {
    padding: 0,
    gap: 10,
  },
});

export const TitleCSS = css({
  fontSize: 34,
  fontWeight: 600,
  lineHeight: '38px',
  letterSpacing: '-0.6px',
});
export const TextCSS = css({
  lineHeight: '130%',
});
export const LinkButtonCSS = css({
  padding: '8px 12px',
  border: `1px solid ${color.line.secondary}`,
  color: color.text.secondary,
  lineHeight: '130%',
  background: '#fff',
  textDecoration: 'none',
  width: 'fit-content',
});

export const SupportListCSS = css({
  padding: 0,
  listStyleType: 'none',

  '& > li': {
    borderBottom: `0.5px solid ${color.line.secondary}`,
  },
});

export const DateCSS = css({
  fontSize: 14,
  lineHeight: '120%',
  color: color.text.secondary,
  marginBottom: 10,
});

export const SupportItemContentCSS = css({
  padding: '12px 8px',
  fontSize: 14,
  lineHeight: '120%',
  background: color.background.container.primary,
});
