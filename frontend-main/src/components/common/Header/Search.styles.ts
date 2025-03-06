import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';
import { HeaderLayoutEnum } from './Header.types';

export const SearchCSS = (layout: HeaderLayoutEnum) =>
  css({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    // margin: '0 20px 0 20px',
    padding: '9px 24px',
    boxSizing: 'border-box',
    borderRadius: 8,
    flex: 1,
    background:
      layout === HeaderLayoutEnum.NORMAL
        ? color.background.container.primary
        : color.background.container.charcoal,

    [mq.desktop]: {
      maxWidth: 500,
    },
    [mq.mobile]: {
      padding: '10px 24px 10px 12px',
      gap: 10,
    },
  });

export const SearchInputCSS = css({
  flex: 1,
  fontSize: 16,
  lineHeight: '100%',
  letterSpacing: '-0.165px',
  background: 'transparent',
  border: 'none',
  outline: 'none',

  '&::placeholder': {
    color: color.text.neutral[4][100],
  },
});
