import { icons } from 'feather-icons';

import { Link } from './Link';
import type { BasePath, ComponentProps } from '../types';

type FloatingLinkProps = {
  basePath: BasePath;
  entityId: string;
  icon: keyof typeof icons;
};

export function FloatingLink({ basePath, entityId, icon }: ComponentProps<FloatingLinkProps>) {
  return (
    <Link
      href={`/${basePath}/${entityId}`}
      class="fixed bottom-5 right-5 rounded-full bg-pico-primary p-3 shadow-md"
    >
      {icons[icon].toSvg({ class: 'w-7 h-7 stroke-white' })}
    </Link>
  );
}
