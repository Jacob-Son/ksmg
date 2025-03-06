import { css } from '@emotion/react';
import { color } from 'src/styles/colors';

export const OrderTabsContainerCSS = css({
  margin: '40px auto',
  display: 'flex',
  alignItems: 'center',
  gap: 40,
});

export const OrderTabItemCSS = (isCurrent: boolean) =>
  css({
    display: 'flex',
    alignItems: 'center',
    gap: 17,
    padding: '0 12px 18px 0',
    borderBottomWidth: '2px',
    borderBottomStyle: 'solid',
    borderBottomColor: isCurrent
      ? color.text.neutral[7][100]
      : color.border.primary,
    fontWeight: 400,
    lineHeight: '130%',
    letterSpacing: '-0.165px',
    color: isCurrent ? color.text.neutral[2][100] : color.text.secondary,
  });

export const OrderTabNumberCSS = (isCurrent: boolean) =>
  css({
    backgroundColor: isCurrent
      ? color.text.neutral[2][100]
      : color.text.secondary,
    color: color.text.neutral[8][100],
    fontWeight: 600,
    lineHeight: '100%',
    width: 24,
    height: 24,
    padding: '5px 0',
    textAlign: 'center',
    boxSizing: 'border-box',
    borderRadius: '50%',
  });
