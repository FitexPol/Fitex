import pl from '@/i18n/pl-PL.json';

export enum Lang {
  Pl = 'pl-PL',
}

const translations: Record<Lang, Record<string, string>> = {
  [Lang.Pl]: pl,
};

export type TranslationModule = keyof typeof pl;

export function $t(tString: string, lang: Lang = Lang.Pl): string {
  const tModule = translations[lang];
  return tModule[tString] ? tModule[tString] : tModule['_errors.translation'];
}
