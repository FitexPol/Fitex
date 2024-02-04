import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function $tm(...args: ClassValue[]): string {
  return twMerge(clsx(args));
}
