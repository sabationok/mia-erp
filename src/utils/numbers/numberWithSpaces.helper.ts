import _ from 'lodash';
import Decimal from 'decimal.js';

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

export function toPrice(n: number | any = 0, decimals: number = 2) {
  if (_.isNaN(Number(n))) {
    return n || '00.00';
  }

  return new Decimal(n).toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
