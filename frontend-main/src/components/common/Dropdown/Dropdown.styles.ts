import { css } from '@emotion/react';
import { color } from 'src/styles/colors';

export const DropdownCSS = css`
  padding: 6px;
  background-color: #fff;
  border-radius: 6px;
  box-sizing: border-box;
  width: 100px;

  & ul {
    list-style: none;
    padding: 0;
  }
`;

export const DropdownItemCSS = css`
  padding: 4px 6px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  font-size: 14px;
  line-height: 17px;
  transition: 0.3s all ease-in-out;
  cursor: pointer;

  &:hover,
  &:active {
    background-color: ${color.background.container.gray};
    font-weight: 600;
  }

  & a {
    color: ${color.text.primary} !important;
    text-decoration: none;
    width: 100%;
    user-select: none;
  }
`;
