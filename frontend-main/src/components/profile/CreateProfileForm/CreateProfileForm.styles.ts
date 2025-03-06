import { css } from '@emotion/react';
import { mq } from 'src/styles/mediaQuery';

export const SubmitButtonCSS = css({
  margin: '70px auto 0 auto',
  width: '100%',
  maxWidth: 288,

  [mq.mobile]: {
    maxWidth: '100%',
  },
});

export const FormFlexCotainerCSS = css({
  display: 'flex',
  alignItems: 'center',
  marginTop: 40,
  gap: 50,

  [mq.mobile]: {
    flexDirection: 'column',
  },
});
