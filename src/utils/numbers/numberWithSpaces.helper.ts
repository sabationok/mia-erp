import _ from 'lodash';

export function numberWithSpaces(n: number | any = 0, fractionDigits: number = 2) {
  const value = Number(n);

  if (_.isNaN(value)) {
    return n || '--.--';
  }

  return value
    .toFixed(fractionDigits)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
