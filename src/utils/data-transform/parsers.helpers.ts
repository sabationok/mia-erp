export function parseBool(key?: 'false' | 'true' | string) {
  return key === 'true' || key === 'false';
}
