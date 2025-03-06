import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';

export const BidLogsContainerCSS = css({
  marginTop: 60,
  padding: '24px 20px 26px 20px',
  background: color.background.container.primary,
  borderRadius: 20,

  [mq.mobile]: {
    marginTop: 0,
    padding: 20,
    background: 'white',
    borderBottom: `8px solid ${color.background.container.primary}`,
    borderRadius: 0,
  },
});

export const BidLogsHeadCSS = css({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
});

export const MbBidLogsWrapperCSS = css({
  marginTop: 10,
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
});

export const MbBidLogCSS = (isMine: boolean) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    padding: '16px 20px 10px 20px',
    letterSpacing: '-0.165px',
    background: color.background.container.primary,
    borderRadius: 10,

    ...(isMine && {
      color: color.purple,
    }),
  });

export const MbBidLogDateCSS = (isMine: boolean) =>
  css({
    marginLeft: 'auto',
    fontSize: 14,
    fontWeight: 300,
    lineHeight: '120%',
    color: color.text.secondary,
    ...(isMine && {
      color: color.purple,
    }),
  });

export const BidLogsTableCSS = css({
  padding: '0 10px',
  width: '100%',
  boxSizing: 'border-box',
  fontSize: 16,
  letterSpacing: '-0.165px',
  borderSpacing: '0',

  '& th': {
    padding: '14px 0 26px 0',
    textAlign: 'start',
    fontWeight: 600,
    lineHeight: '100%',
    borderBottom: `1px solid ${color.line.primary}`,
  },

  '& td': {
    padding: '20px 0',
  },
});

export const BidLogDateCSS = (isMine: boolean) =>
  css({
    marginLeft: 'auto',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '130%',
    color: color.text.secondary,
    ...(isMine && {
      color: color.purple,
    }),
  });

export const ShowAllButtonCSS = css({
  marginTop: 30,
  gap: 10,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  border: 'none',
  fontWeight: 400,

  [mq.mobile]: {
    marginTop: 10,
    height: 49,
  },
});
