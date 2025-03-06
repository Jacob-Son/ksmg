import { css } from '@emotion/react';
import { color } from 'src/styles/colors';

export const ProfileFlexCSS = css({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
});

export const ProfileImageCSS = css({
  width: 56,
  height: 56,
  borderRadius: '50%',
  background: color.skeleton,
});

export const UserInfoWrapperCSS = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignContent: 'center',
  gap: 8,
});

export const UsernameCSS = css({
  color: '#fff',
  fontSize: 20,
  fontWeight: 600,
  lineHeight: '120%',
});

export const AddressNameCSS = css({
  color: color.text.secondary,
  fontSize: 14,
  lineHeight: '120%',
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  cursor: 'pointer',
});
