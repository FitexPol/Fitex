import { Card } from '@components/Card';
import { Link } from '@components/Link';
import type { ComponentProps } from '@types';
import { $t } from '@utils/$t';
import { $tm } from '@utils/$tm';
import { getPath } from '@utils/getPath';

import { SignInForm } from './forms/SignInForm';
import { SignUpForm } from './forms/SignUpForm';

const _t = $t('auth');

type FormType = 'signIn' | 'signUp';

type Tab = {
  href: string;
  label: string;
  component: JSX.Element;
};

const tabs = new Map<FormType, Tab>([
  [
    'signIn',
    {
      href: '/auth',
      label: _t('authSection.signIn'),
      component: <SignInForm />,
    },
  ],
  [
    'signUp',
    {
      href: getPath('/auth', { type: 'signUp' }),
      label: _t('authSection.signUp'),
      component: <SignUpForm />,
    },
  ],
]);

type AuthSectionProps = {
  typeQuery: string;
};

export function AuthSection({ typeQuery }: ComponentProps<AuthSectionProps>) {
  const activeTab: FormType = getActiveForm(typeQuery);

  function Component() {
    const tab = tabs.get(activeTab);

    if (!tab) return <></>;

    return tab.component;
  }

  return (
    <div class="container">
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
    </div>
  );
}

function getActiveForm(queryParam: string): FormType {
  switch (queryParam) {
    case 'signUp':
      return 'signUp';
    default:
      return 'signIn';
  }
}
