export default function numberWithSpaces(n?: number) {
  if (n === undefined) {
    return '0.00';
  } else if (n === null) {
    return '0.00';
  }
  return n
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
