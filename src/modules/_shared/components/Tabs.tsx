import { Card } from './Card';
import { Link } from './Link';
import { type ComponentProps } from '../types';
import { $tm } from '../utils/$tm';

export type Tab = {
  href: string;
  label: string;
  component: JSX.Element;
};

type TabsProps<T> = {
  tabs: Map<T, Tab>;
  activeTab: T;
};

export function Tabs<T extends string>({ tabs, activeTab }: ComponentProps<TabsProps<T>>) {
  function Component() {
    const tab = tabs.get(activeTab);

    if (!tab) return <></>;

    return tab.component;
  }

  return (
    <Card class="relative">
      <>
        <div class="absolute left-0 top-0 flex -translate-y-full">
          {Array.from(tabs.entries()).map(([tab, { href, label }]) => (
            <Link
              href={href}
              class={$tm(
                'rounded-t-lg px-4 py-2',
                activeTab === tab && 'pointer-events-none bg-pico-card-background',
              )}
            >
              {label}
            </Link>
          ))}
        </div>

        <Component />
      </>
    </Card>
  );
}
