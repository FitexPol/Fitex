import { icons } from 'feather-icons';

import { Link } from './Link';

export function Breadcrumbs() {
  return (
    <ul>
      <li>
        <Link href="/">{icons.home.toSvg()}</Link>/
      </li>
    </ul>
  );
}
