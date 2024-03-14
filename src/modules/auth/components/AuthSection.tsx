import { type Tab, Tabs } from '@components/Tabs';
import type { ComponentProps } from '@types';
import { $t } from '@utils/$t';
import { getPath } from '@utils/getPath';

import { SignInForm } from './forms/SignInForm';
import { SignUpForm } from './forms/SignUpForm';

const _t = $t('auth');

type FormType = 'signIn' | 'signUp';

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

  return (
    <div class="container">
      <Tabs tabs={tabs} activeTab={activeTab} />
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
