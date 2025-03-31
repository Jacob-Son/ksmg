import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';

export const RanksContainerCSS = css({
  marginTop: 20, // ✅ 위쪽 간격 추가
  display: 'flex',
  flexDirection: 'column',
  padding: '0 24px',
  letterSpacing: '-0.165px',
});

export const RanksHeadCSS = css({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
});

export const RankDurationCSS = css({
  color: color.text.secondary,
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '100%',
});

export const RankIconCSS = css({
  marginRight: 'auto',
});

export const RankSortSelectCSS = css({
  border: 'none',
  padding: '10px 20px',
  height: 'fit-content',
});

export const RankSortFlexCSS = css({
  display: 'flex',
  alignItems: 'center',
  gap: 20,
  '& button': {
    color: color.text.secondary,
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '100%',
    background: 'none',
    border: 'none',
    cursor: 'pointer',

    '&[aria-current="true"]': {
      color: color.purple,
    },
  },
});

export const RanksGridCSS = css({
  marginTop: 36,
  display: 'grid',
  gridAutoFlow: 'column',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridTemplateRows: 'repeat(5, 1fr)',
  gap: '28px 60px',

  [mq.mobile]: {
    gridAutoFlow: 'row',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gridTemplateRows: 'auto',
  },
});

export const RankGridItemCSS = css({
  display: 'flex',
  alignItems: 'center',
  gap: 26,
  padding: '10px 14px 10px 12px',
  width: '100%',
  boxSizing: 'border-box',
  textDecoration: 'none',
  color: color.text.primary,
});

export const RankItemRankCSS = css({
  color: color.text.secondary,
  fontWeight: 600,
  lineHeight: '100%',
});

export const RankItemNameCSS = css({
  fontSize: 18,
  fontWeight: 600,
  lineHeight: '100%',
});

export const RankItemProductCountCSS = css({
  marginLeft: 'auto',
  color: color.text.secondary,
  fontSize: 14,
  fontWeight: 300,
  lineHeight: '120%',
});

export const ShowMoreButtonCSS = css({
  margin: '28px auto 0 auto',
  padding: '16px 20px',
  width: 122,
  height: 50,
  boxSizing: 'border-box',
  border: `1px solid ${color.border.primary}`,
  borderRadius: '99px',
  background: '#fff',
  color: color.text.primary,
  fontWeight: 600,
  lineHeight: '100%',
  textAlign: 'center',
  textDecoration: 'none',
});
