import { css } from '@emotion/react';
import { color } from 'src/styles/colors';

export const InfoCardsContainerCSS = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 12,
});

export const InfoCardCSS = css({
  display: 'flex',
  flexDirection: 'column',
  padding: 16,
  gap: 8,
  border: `1px solid ${color.border.primary}`,
  borderRadius: 14,
  fontSize: 14,
  fontWeight: 300,
  lineHeight: '120%',
  letterSpacing: '-0.165px',
});
