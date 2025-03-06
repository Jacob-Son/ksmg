import { css } from '@emotion/react';
import { mq } from 'src/styles/mediaQuery';

export const PlayerSectionContainerCSS = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: 'url(/imgs/project/img_bg.png)',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  width: '100%',
  minHeight: 708,
  boxSizing: 'border-box',

  [mq.mobile]: {
    minHeight: 541,
  },
});

export const PlayerGradientCSS = css({
  padding: '30px 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: 'url(/imgs/project/img_bg.png)',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  background: 'radial-gradient(rgba(0, 0, 0, 0.62), rgba(0, 0, 0, 0))',
  width: '100%',
  flex: 1,
});

export const ProjectNoCSS = css({
  fontFamily: "'Cormorant', serif",
  fontSize: 38,
  lineHeight: '130%',

  '& span': {
    fontSize: 62,
    fontFamily: "'Cormorant', serif",
  },

  [mq.mobile]: {
    fontSize: 26,

    '& span': {
      fontSize: 50,
      fontFamily: "'Cormorant', serif",
    },
  },
});

export const SectionTitleCSS = css({
  fontSize: 40,
  lineHeight: '130%',
  fontWeight: 700,

  [mq.mobile]: {
    fontSize: 50,
  },
});

export const SectionDescriptionCSS = css({
  marginTop: 30,
  marginBottom: 30,
  padding: '0 20px',
  lineHeight: '160%',
  color: '#CCC',
  textAlign: 'center',
  wordBreak: 'keep-all',

  [mq.mobile]: {
    marginTop: 18,
    marginBottom: 46,
    fontSize: 14,
    lineHeight: '130%',
  },
});
