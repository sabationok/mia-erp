import _ from 'lodash';

function countPercentage(
  amount: number | undefined = 0,
  total: number | undefined = 0,
  fractionDigits: number | undefined = 2
) {
  return ((amount / total) * 100).toFixed(fractionDigits);
}

export default function numberWithSpaces(n: number | any = 0, fractionDigits: number = 2) {
  const value = Number(n);

  if (_.isNaN(value)) {
    return n || '--.--';
  }

  return value
    .toFixed(fractionDigits)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export { countPercentage, numberWithSpaces };
