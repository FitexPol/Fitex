import pl from '@/i18n/pl-PL.json';

export enum Lang {
  Pl = 'pl-PL',
}

const translations = {
  [Lang.Pl]: pl,
};

export type TranslationModule = keyof typeof pl;

export function $t(keys: string, lang: Lang = Lang.Pl): string {
  const keysArray = keys.split('.');

  let translation = '';

  keysArray.reduce(
    (acc, key) => {
      const t = acc[key as keyof typeof acc] as Record<string, unknown> | string;

      if (!t) {
        translation = $t('errors.translation');
        return {};
      }

      if (typeof t === 'object') {
        return t;
      }

      translation = t;
      return {};
    },
    translations[lang] as Record<string, unknown> | string,
  );

  return translation;
}
