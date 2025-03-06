export const breakpoints = {
  mb_600: 600,
  tb_768: 768,
  tb_1076: 1076,
};

export const mediaQuery = {
  down: (max: number) => `@media screen and (max-width: ${max}px)`,
  between: (min: number, max: number) =>
    `@media screen and (min-width: ${min}px) and (max-width: ${max}px)`,
  up: (min: number) => `@media screen and (min-width: ${min}px)`,
};

export const mq = {
  mobile: mediaQuery.down(breakpoints.mb_600),
  smTablet: mediaQuery.between(breakpoints.mb_600, breakpoints.tb_768),
  lgTablet: mediaQuery.between(breakpoints.tb_768, breakpoints.tb_1076),
  tablet: mediaQuery.between(breakpoints.mb_600, breakpoints.tb_1076),
  desktop: mediaQuery.up(breakpoints.tb_1076),
};
