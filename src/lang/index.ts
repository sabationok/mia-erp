import { langUa } from './ua';

export interface langPack extends Record<LangTextKey, string> {}

export type LangTextKey = keyof typeof langUa;

const langPacks: Record<'ua' | 'en' | 'de' | 'pl', langPack> = {
  ua: langUa,
  en: langUa,
  de: langUa,
  pl: langUa,
};

function translate(key: LangTextKey): string {
  return langPacks.ua[key] || langPacks.en[key] || key;
}

export default translate;
