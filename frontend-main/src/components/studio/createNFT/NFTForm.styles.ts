import { css } from '@emotion/react';

export const FormTitleCSS = css({ marginTop: 40 });
export const TextFieldCSS = css({
  marginTop: 20,
  height: 62,
});

export const UploadedA5ImageCSS = css({
  width: '100%',
  '& div': {
    aspectRatio: `1 / ${Math.sqrt(2)}`,
  },
});
