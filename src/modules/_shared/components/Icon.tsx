import { icons } from 'feather-icons';

import { type PropsWithClass } from '../types';

type IconProps = {
  type: keyof typeof icons;
};

export function Icon({ type, class: className }: PropsWithClass<IconProps>) {
  return icons[type].toSvg({ class: className });
}
