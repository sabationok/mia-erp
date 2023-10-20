import { langUa } from './ua';
import { checks } from '../utils';

export type LangTextKey = keyof typeof langUa | string;
export type LangKey = 'ua' | 'en' | 'de' | 'pl';
export interface LangPack extends Record<LangKey, string> {}
export interface LangDir extends Record<LangTextKey, string> {}

const langDirectory: Record<LangKey, LangDir> = {
  ua: langUa,
  en: langUa,
  de: langUa,
  pl: langUa,
};

function translate(key: LangTextKey): string {
  if (`${key}` in langDirectory.ua) return langDirectory.ua[key];
  if (`${key}` in langDirectory.en) return langDirectory.en[key];
  return key;
}

export function t(key: LangTextKey): string {
  if (key in langDirectory.ua && langDirectory.ua[key]) return langDirectory.ua[key];
  if (key in langDirectory.en && langDirectory.en[key]) return langDirectory.en[key];
  return key;
}
export function getTranslatedString(langPack: LangPack | string, langKey: LangKey = 'ua') {
  try {
    if (checks.isStr(langPack)) {
      return JSON.parse(langPack)[langKey];
    } else if (checks.isObj(langPack)) {
      return langPack[langKey];
    } else {
      return langPack;
    }
  } catch (e) {
    console.error('getTranslatedString error', e);
    console.log({ langPack, langKey });
    return 'Translate error';
  }
}
export default translate;
