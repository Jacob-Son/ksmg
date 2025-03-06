import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';

export const HeadFlexCSS = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',

  '& > div': {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    [mq.mobile]: {
      gap: 8,
    },
  },
  [mq.mobile]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 18,
  },
});

export const ButtonCSS = css({
  fontSize: 14,
  height: 34,
});

export const NotFoundBodyCSS = css({
  marginTop: 13,
  padding: '120px 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 28,

  '& img': {
    paddingTop: 8,
  },

  [mq.mobile]: {
    marginTop: 20,
    gap: 36,

    '& img': {
      paddingTop: 54,
    },
  },
});

export const InfoSectionCSS = css({
  padding: '20px 14px',
  borderRadius: 8,
  fontWeight: 600,
  background: color.background.container.primary,
});

export const InfoSectionTitleCSS = css({
  fontSize: 14,
  lineHeight: '100%',
  color: color.text.secondary,
});

export const InfoSectionValueCSS = css({
  marginTop: 4,
  fontSize: 24,
  lineHeight: '120%',
});

export const RequestButtonCSS = css({
  marginLeft: 'auto',
  fontSize: 14,
  height: 40,
});

export const SettleItemsWrapperCSS = css({
  position: 'relative',
  width: '100%',
});

export const DecorationCSS = css({
  position: 'absolute',
  bottom: 0,
  left: 6,
  height: 'calc(100% - 25px)',
  borderLeft: `1px solid ${color.border.primary}`,
});
