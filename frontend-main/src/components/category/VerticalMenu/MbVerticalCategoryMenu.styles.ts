import { css } from '@emotion/react';
import { color } from 'src/styles/colors';

export const VerticalMenuContainerCSS = css({
  display: 'grid',
  minHeight: 600,
  gridTemplateColumns: 'auto 1fr',
});

export const CategoriesFlexCSS = css({
  padding: 0,
  display: 'flex',
  width: 120,
  height: '100%',
  flexDirection: 'column',
  listStyleType: 'none',
  background: color.background.container.primary,
  color: color.text.secondary,

  '& > li': {
    padding: 20,
    fontWeight: 600,
    lineHeight: '100%',
  },
});

export const ThemesFlexCSS = css({
  padding: 0,
  display: 'flex',
  width: '100%',
  height: '100%',
  flexDirection: 'column',
  listStyleType: 'none',

  '& > li': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 20px',
    fontWeight: 400,
    lineHeight: '130%',
  },
});
