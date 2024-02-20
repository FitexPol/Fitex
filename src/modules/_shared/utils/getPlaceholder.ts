import { $t, type TranslationModule } from './$t';

export function getPlaceholder(placeholder?: string): string {
  if (!placeholder) return '';

  const [module, ...keys] = placeholder.split('.');

  const _t = $t(module as TranslationModule);

  return _t(keys.join('.'));
}
