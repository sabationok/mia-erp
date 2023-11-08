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

export class LocalizeService {
  private static lang: LangKey = 'ua';

  public static setLang(key: LangKey) {
    this.lang = key;
  }
  public static getLang() {
    return this.lang;
  }
}

function translate(key: LangTextKey, lang: LangKey = LocalizeService.getLang()): string {
  if (key in langDirectory[lang] && langDirectory[lang][key]) return langDirectory[lang][key];
  return key;
}

export function t(key: LangTextKey, lang: LangKey = LocalizeService.getLang()): string {
  // if (!(key in langDirectory[lang])) {
  //   console.log('key in langDirectory[lang]', key, key in langDirectory[lang]);
  //   console.log({ lang });
  // }
  if (key in langDirectory[lang] && langDirectory[lang][key]) return langDirectory[lang][key];
  return key;
}
export function getTranslatedString(langPack: LangPack | string, langKey: LangKey = LocalizeService.getLang()) {
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
