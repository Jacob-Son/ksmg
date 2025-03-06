export function nFormatter(num, digits = 4) {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
    : '0';
}

export function addComma(num: number | string): string {
  if (!num) return String(num);
  const val: string = typeof num === 'number' ? num.toString() : num;
  return val.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const reduceString = (val: string, first = 6, last = 4) => {
  return val.slice(0, first) + '...' + val.slice(-last);
};

export function onlyNumber(value: string) {
  return value.replace(/[^0-9.]/g, '');
}

export function returnBetween(x: number, min: number, max: number) {
  return Math.min(Math.max(x, min), max);
}
