import { Card } from '@components/Card';
import { Link } from '@components/Link';
import type { ComponentProps } from '@types';
import { $t } from '@utils/$t';
import { $tm } from '@utils/$tm';
import { getPath } from '@utils/getPath';

import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

const _t = $t('auth');

type FormType = 'signIn' | 'signUp';
type Tab = { href: string; label: string };

const tabs = new Map<FormType, Tab>([
  [
    'signIn',
    {
      href: '/auth',
      label: _t('authSection.signIn'),
    },
  ],
  [
    'signUp',
    {
      href: getPath('/auth', { type: 'signUp' }),
      label: _t('authSection.signUp'),
    },
  ],
]);

type AuthSectionProps = {
  typeQuery: string;
};

export function AuthSection({ typeQuery }: ComponentProps<AuthSectionProps>) {
  const formType: FormType = getFormType(typeQuery);

  return (
    <div class="container">
      <Card class="relative">
        <>
          <div hx-boost="true" class="absolute left-0 top-0 flex -translate-y-full">
            {Array.from(tabs.entries()).map(([type, { href, label }]) => (
              <Link
                href={href}
                class={$tm(
                  'rounded-t-lg px-4 py-2',
                  formType === type && 'pointer-events-none bg-pico-card-background',
                )}
              >
                {label}
              </Link>
            ))}
          </div>

          {formType === 'signUp' ? <SignUpForm /> : <SignInForm />}
        </>
      </Card>
    </div>
  );
}

function getFormType(queryParam: string): FormType {
  switch (queryParam) {
    case 'signUp':
      return 'signUp';
    default:
      return 'signIn';
  }
}
