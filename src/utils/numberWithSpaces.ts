export default function numberWithSpaces(n?: number | any, fractionDigits: number = 2) {
  if (n === undefined) {
    return '0.00';
  } else if (n === null) {
    return '0.00';
  }
  return n
    .toFixed(fractionDigits)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
