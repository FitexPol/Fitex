import pl from '@/i18n/pl-PL';

export enum Lang {
  Pl = 'pl-PL',
  En = 'en-US',
}

const translations = {
  [Lang.Pl]: pl,
  [Lang.En]: pl, // <- temporary
};

export type TranslationModule = keyof typeof pl;

export function $t(module: TranslationModule, lang: Lang = Lang.Pl): (keys: string) => string {
  return (keys: string) => {
    const tModule = translations[lang][module];

    if (!tModule) throw new Error(`Module ${module} not found in translations`);

    const keysArray = keys.split('.');

    let translation = '';

    keysArray.reduce(
      (acc, key) => {
        const t = acc[key as keyof typeof acc] as Record<string, unknown> | string;

        if (!t) {
          translation = $t('_shared')('_shared.errors.translation');
          return {};
        }

        if (typeof t === 'object') {
          return t;
        }

        translation = t;
        return {};
      },
      tModule as Record<string, unknown> | string,
    );

    return translation;
  };
}
