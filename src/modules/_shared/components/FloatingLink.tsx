import { icons } from 'feather-icons';

import { Link } from './Link';
import type { ComponentProps } from '../types';
import { $tm } from '../utils/$tm';

type FloatingLinkProps = {
  href: string;
  icon: {
    type: keyof typeof icons;
    class?: string;
  };
  text?: string;
};

export function FloatingLink({ href, icon, text, class: className }: ComponentProps<FloatingLinkProps>) {
  return (
    <Link
      href={href}
      class={$tm(
        'fixed bottom-5 left-5 inline-flex items-center gap-1 rounded-full border-2 border-pico-primary bg-pico-background p-2.5 shadow-md',
        className,
      )}
    >
      <>
        {text && <span class="ml-2 text-sm font-medium text-white">{text}</span>}
        {icons[icon.type].toSvg({ class: $tm('w-7 h-7 stroke-pico-primary', icon.class) })}
      </>
    </Link>
  );
}
