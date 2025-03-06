import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';

export const SectionHeadCSS = css({
  padding: 60,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'end',
  textAlign: 'center',
  width: '100%',
  height: 428,
  boxSizing: 'border-box',
  backgroundImage: 'url(/imgs/project/img_bg_chapter5.png)',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',

  [mq.mobile]: {
    background: 'none',
    height: 'fit-content',
    padding: 0,
  },
});

export const ContentsFlexCSS = css({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: 40,
  marginTop: 40,
});

export const ContentCSS = css({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',

  [mq.mobile]: {
    alignItems: 'center',
  },
});

export const ContentDecorationCSS = css({
  width: 39,
  borderTop: '4px solid #fff',
});

export const ContentTitleCSS = css({
  marginTop: 30,
  marginBottom: 16,
  fontSize: 22,
  fontWeight: 600,
  lineHeight: '100%',
  wordBreak: 'keep-all',

  [mq.mobile]: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 18,
    lineHeight: '110%',
    textAlign: 'center',
  },
});

export const ContentDescriptionsListCSS = css({
  listStyleType: '"·  "',
  paddingLeft: 18,
  lineHeight: '160%',
  color: color.text.secondary,

  '& li::marker': {
    fontWeight: 800,
  },
});
