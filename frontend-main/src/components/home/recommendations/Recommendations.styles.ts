import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { breakpoints, mediaQuery, mq } from 'src/styles/mediaQuery';
import { animationSettings } from './Recommendations.constants';

export const MbRecommendationCarouselCSS = css({
  marginTop: 40,
  padding: '0 24px',
  width: '100%',
  boxSizing: 'border-box',
  overflow: 'hidden',
});

export const MbCarouselContainerCSS = css({
  display: 'flex',
  width: '100%',
  gap: 24,
  overflow: 'visible',
  transition: `transform ${animationSettings.slideSpeed}ms ease-in-out`,
});

export const RecommendationCarouselCSS = css({
  display: 'flex',
  alignItems: 'center',
  marginTop: 40,
  gap: 24,
  width: '100%',
  overflow: 'scroll',
  boxSizing: 'border-box',
  letterSpacing: '-0.165px',

  '&::-webkit-scrollbar': {
    height: 7,
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: 5,
    background: 'transparent',
  },

  '&:hover': {
    '&::-webkit-scrollbar-thumb': {
      background: color.icon.tertiary,
    },
  },

  [mediaQuery.up(breakpoints.mb_600)]: {
    padding: '0 24px',
  },
});

export const RecommendationItemCSS = css({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flexShrink: 0,
  width: 425,
  height: 354,
  borderRadius: 12,
  textDecoration: 'none',
  color: color.text.primary,
  paddingTop: 20,
  overflow: 'hidden',

  [mq.mobile]: {
    width: '100%',
  },
});

export const ItemInformationCSS = css({
  textAlign: 'center',
  fontSize: 14,
  fontWeight: 300,
  lineHeight: '120%',
  padding: '0 20px',
  wordBreak: 'keep-all',
});

export const ItemCoverImageCSS = css({
  marginTop: 12,
  width: 159,
  height: 214,
  borderRadius: 3,
  background: color.skeleton,
  boxShadow: '0px 4px 8.3px 0px rgba(0, 0, 0, 0.07)',
  objectFit: 'cover',
});

export const RefereeFlexCSS = css({
  position: 'absolute',
  bottom: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '14px 20px 20px 20px',
  width: '100%',
  boxSizing: 'border-box',
  background: 'rgba(36, 36, 36, 0.13)',
  backdropFilter: 'blur(25px)',
});

export const RefereeProfileCSS = css({
  width: 70,
  height: 70,
  background: color.skeleton,
  borderRadius: '50%',
});

export const RefereeNameCSS = css({
  fontSize: 18,
  fontWeight: 600,
  lineHeight: '100%',
});

export const RefereeDescriptionCSS = css({
  marginTop: 6,
  fontSize: 14,
  fontWeight: 300,
  lineHeight: '120%',
});

export const DotsWrapperCSS = css({
  marginTop: 20,
  display: 'flex',
  justifyContent: 'center',
});
