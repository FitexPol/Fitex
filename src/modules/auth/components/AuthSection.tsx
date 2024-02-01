import type { ComponentProps } from '@types';
import { $tm } from '@utils/$tm';

import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

type FormType = 'signIn' | 'signUp';
type Tab = { href: string; label: string };

const tabs = new Map<FormType, Tab>([
  [
    'signIn',
    {
      href: '/auth',
      label: 'Sign in',
    },
  ],
  [
    'signUp',
    {
      href: '/auth?type=signUp',
      label: 'Sign up',
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
      <article class="relative">
        <div hx-boost="true" class="absolute left-0 top-0 flex -translate-y-full">
          {Array.from(tabs.entries()).map(([type, { href, label }]) => (
            <a
              href={href}
              class={$tm(
                'rounded-t-lg px-4 py-2',
                formType === type && 'pointer-events-none bg-pico-card-background',
              )}
            >
              {label}
            </a>
          ))}
        </div>

        {formType === 'signUp' ? <SignUpForm /> : <SignInForm />}
      </article>
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
