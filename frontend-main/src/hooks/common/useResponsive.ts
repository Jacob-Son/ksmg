import { debounce } from 'lodash';
import { useLayoutEffect, useState } from 'react';
import { breakpoints } from 'src/styles/mediaQuery';

export const useBrowserLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : () => {};

export const useResponsive = () => {
  const [width, setWidth] = useState(0);
  const isMobile = width < breakpoints.mb_600;
  const isSmallTablet =
    width >= breakpoints.mb_600 && width < breakpoints.tb_768;
  const isLargeTablet =
    width >= breakpoints.tb_768 && width < breakpoints.tb_1076;
  const isTablet = isSmallTablet || isLargeTablet;
  const isDesktop = width >= breakpoints.tb_1076;

  const handleResize = debounce(() => {
    setWidth(window.innerWidth);
  }, 100);
  useBrowserLayoutEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  return {
    isMobile,
    isSmallTablet,
    isLargeTablet,
    isTablet,
    isDesktop,
  };
};
