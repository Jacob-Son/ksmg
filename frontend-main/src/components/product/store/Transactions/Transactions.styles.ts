import { css } from '@emotion/react';
import { color } from 'src/styles/colors';

export const TransactionsContainerCSS = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
});

export const TransactionItemCSS = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  padding: '16px 24px',
  background: color.background.container.primary,
  borderRadius: 11,
  fontWeight: 400,
  lineHeight: '100%',
  letterSpacing: '-0.165px',
});

export const AddressCSS = css({
  color: color.text.secondary,
});
