import { css } from '@emotion/react';
import { color } from 'src/styles/colors';

export const MenuSectionCSS = css({
  width: 200,
  flexShrink: 0,
});

export const MenuContainerCSS = css({
  position: 'sticky',
  top: 110,
});

export const CategoryListCSS = css({
  padding: 0,
  listStyleType: 'none',

  '& > li': {
    position: 'relative',
    minHeight: 52,
    overflow: 'hidden',
    borderBottom: `1px solid ${color.border.primary}`,

    '& > div > p': {
      fontSize: 18,
      fontWeight: 600,
      lineHeight: '-0.165px',
    },
  },
  '& > li:last-of-type': {
    borderBottom: 'none',
  },
});

export const ThemeListCSS = css({
  marginTop: 4,
  minHeight: 0,
  overflow: 'hidden',
  '& > p': {
    padding: '10px 10px 10px 4px',
    fontSize: 16,
    fontWeight: 600,
    lineHeight: '100%',
  },

  '& ul': {
    padding: 0,
    listStyleType: 'none',
  },

  '& li': {
    padding: '10px 10px 10px 4px',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '120%',
    color: color.text.secondary,
    cursor: 'pointer',
  },
  '& li[aria-current="true"]': {
    background: color.background.container.primary,
    color: color.text.primary,
  },
});
