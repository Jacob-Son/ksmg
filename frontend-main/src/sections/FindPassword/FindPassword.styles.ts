import { css } from '@emotion/react';
import { color } from 'src/styles/colors';

export const PhoneNumberFlexCSS = css({
  marginTop: 10,
  display: 'flex',
  gap: 4,

  '& > div': {
    flex: 1,
  },
});

export const TextFieldCSS = css({
  height: 60,
});

export const SendSMSButtonCSS = css({
  background: color.purple,
  width: 76,
});
