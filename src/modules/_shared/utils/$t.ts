import pl from '@/i18n/pl-PL';

export enum Lang {
  Pl = 'pl-PL',
}

const translations = {
  [Lang.Pl]: pl,
};

export type TranslationModule = keyof typeof pl;

export function $t(module: TranslationModule, lang: Lang = Lang.Pl): (keys: string) => string {
  return (keys: string) => {
    const tModule = translations[lang][module];

    if (!tModule) throw new Error(`Module ${module} not found in translations`);

    const keysArray = keys.split('.');

    let translation = '';

    keysArray.reduce((acc, key) => {
      const t = acc[key as keyof typeof acc];

      if (!t) {
        throw new Error(`Translation for ${key} not found`);
      }

      if (typeof t === 'string') {
        translation = t;
      }

      return t;
    }, tModule);

    return translation;
  };
}
