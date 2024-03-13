import { type Tab, Tabs } from '@components/Tabs';
import type { ComponentProps } from '@types';
import { $t } from '@utils/$t';
import { getPath } from '@utils/getPath';

import { SignIn } from './forms/SignIn';
import { SignUp } from './forms/SignUp';

const _t = $t('auth');

type FormType = 'signIn' | 'signUp';

const tabs = new Map<FormType, Tab>([
  [
    'signIn',
    {
      href: '/auth',
      label: _t('authSection.signIn'),
      component: <SignIn />,
    },
  ],
  [
    'signUp',
    {
      href: getPath('/auth', { type: 'signUp' }),
      label: _t('authSection.signUp'),
      component: <SignUp />,
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
