import { css } from '@emotion/react';
import { color } from 'src/styles/colors';

export const BidModalContainerCSS = css({
  padding: '12px 20px 20px 20px',
  maxWidth: 500,
  width: 'calc(100% - 40px)',
  boxSizing: 'border-box',
  textAlign: 'left',
});

export const DividerCSS = css({
  margin: '20px 0',
  width: '100%',
  height: 1,
  background: color.border.primary,
});

export const BidModalSectionTitleCSS = css({
  fontWeight: 600,
  lineHeight: '100%',
  letterSpacing: '-0.165px',
});

export const QuickBidBtnsFlexCSS = css({
  display: 'flex',
  marginTop: 12,
  marginBottom: 26,
  gap: 12,
});

export const QuickBidButtonCSS = css({
  flex: 1,
  border: `1px solid ${color.border.primary}`,

  '&:active': {
    background: color.purple,
    border: `1px solid ${color.purple}`,
    color: 'white',
  },
});

export const BidInputNoticeCSS = css({
  marginTop: 20,
  marginBottom: 8,
  fontSize: 14,
  lineHeight: '130%',
  letterSpacing: '-0.165px',
  color: color.text.secondary,

  '& span': {
    color: color.purple,
  },
});

export const BidInfoGridCSS = css({
  display: 'grid',
  gridTemplateColumns: '100px 1fr',
  gap: '16px 20px',
  marginTop: 20,

  '& p': {
    lineHeight: '130%',
    letterSpacing: '-0.165px',
  },
  '& p:nth-of-type(2n + 1)': {
    color: color.text.secondary,
  },
});

export const BidNoticesCSS = css({
  marginTop: 20,
  paddingLeft: 20,
  display: 'flex',
  flexDirection: 'column',
  fontSize: 14,
  fontWeight: 400,
  lineHeight: '120%',
  letterSpacing: '-0.165px',
  color: color.text.secondary,
  '& li': {
    position: 'relative',
    listStyle: 'none',
  },
  '& li::before': {
    content: '""',
    position: 'absolute',
    top: '10px',
    left: '-15px',
    width: 3,
    height: 3,
    borderRadius: '50%',
    backgroundColor: color.text.secondary,
  },
});
