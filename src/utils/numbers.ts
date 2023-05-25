function countPercentage(
  amount: number | undefined = 0,
  total: number | undefined = 0,
  fractionDigits: number | undefined = 2
) {
  return ((amount / total) * 100).toFixed(fractionDigits);
}

export default function numberWithSpaces(n?: number | any, fractionDigits: number = 2) {
  if (typeof n === 'string') {
    return n as typeof n;
  } else if (typeof n !== 'number') {
    return '0.00';
  }
  return n
    .toFixed(fractionDigits)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export { countPercentage, numberWithSpaces };
