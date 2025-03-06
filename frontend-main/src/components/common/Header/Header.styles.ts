import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { breakpoints, mediaQuery, mq } from 'src/styles/mediaQuery';
import { maxWidth } from 'src/styles/styles';
import { HeaderLayoutEnum } from './Header.types';

export const HeaderCSS = (layout: HeaderLayoutEnum) =>
  css({
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 2,
    display: 'flex',
    width: '100%',
    background:
      layout === HeaderLayoutEnum.NORMAL
        ? '#fff'
        : color.background.container.black,
  });

export const HeaderWrapperCSS = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '0 auto',
  padding: '16px 40px',
  width: '100%',
  maxWidth: `${maxWidth}px`,
  height: '38px',
  gap: 20,
  // boxSizing: 'border-box',

  '& ul': {
    margin: 0,
  },

  [mediaQuery.down(breakpoints.tb_768)]: {
    padding: '16px 20px',
    height: '24px',
    justifyContent: 'flex-start',
  },
});

export const HeaderLogoCSS = css({
  [mediaQuery.down(breakpoints.tb_768)]: {
    marginRight: 'auto',
  },
});

export const HeaderNavSectionCSS = css({
  display: 'flex',
  gap: 30,
  padding: '0',
  listStyle: 'none',

  [mediaQuery.down(breakpoints.tb_768)]: { display: 'none' },
  '& a': {
    color: color.text.secondary,
    textDecoration: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '130%',
    letterSpacing: '-0.165px',
  },
});

export const HeaderTitleCSS = (layout: HeaderLayoutEnum) =>
  css({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: 16,
    fontWeight: 600,
    lineHeight: '100%',
    letterSpacing: '-0.165px',

    ...(layout === HeaderLayoutEnum.DARK && {
      color: '#fff',
    }),
  });

export const HeaderSection2CSS = css({
  display: 'flex',
  gap: 16,
  padding: '0',
  listStyle: 'none',

  [mediaQuery.down(breakpoints.tb_768)]: { gap: '12px' },
  '& button': {
    padding: 0,
    background: 'transparent',
    border: 'none',
    height: '24px',
    cursor: 'pointer',
  },
  '& a': {
    height: 24,
    cursor: 'pointer',
    textDecoration: 'none',
  },
});

export const ProfileCSS = css({
  [mediaQuery.down(breakpoints.tb_768)]: { display: 'none' },
});

export const CartLinkCSS = css({
  display: 'flex',
  alignItems: 'center',
});

export const CartLengthCSS = (layout: HeaderLayoutEnum) =>
  css({
    marginLeft: '-8px',
    marginTop: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '15px',
    height: '15px',
    borderRadius: '99px',
    boxSizing: 'border-box',
    fontFeatureSettings: "'clig' off, 'liga' off",
    fontFamily: '"Inter", sans-serif',
    fontSize: '9px',
    fontWeight: 700,
    lineHeight: '7.5px',
    textDecoration: 'none',
    ...(layout === HeaderLayoutEnum.NORMAL && {
      background: color.text.neutral[7][100],
      color: '#fff',
    }),
    ...(layout === HeaderLayoutEnum.DARK && {
      background: color.icon.tertiary,
      color: color.background.container.black,
    }),
  });
