import { langUa } from './ua';

export type LangTextKey = keyof typeof langUa | string;
export interface langPack extends Record<LangTextKey, string> {}

const langPacks: Record<'ua' | 'en' | 'de' | 'pl', langPack> = {
  ua: langUa,
  en: langUa,
  de: langUa,
  pl: langUa,
};

function translate(key: LangTextKey): string {
  if (`${key}` in langPacks.ua) return langPacks.ua[key];
  if (`${key}` in langPacks.en) return langPacks.en[key];
  return key;
}

export function t(key: LangTextKey): string {
  if (key in langPacks.ua && langPacks.ua[key]) return langPacks.ua[key];
  if (key in langPacks.en && langPacks.en[key]) return langPacks.en[key];
  return key;
}
export default translate;
