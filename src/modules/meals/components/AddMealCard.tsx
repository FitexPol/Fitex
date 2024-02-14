import { icons } from 'feather-icons';

import { Button } from '@components/Button';

export function AddMealCard() {
  return (
    <article class="m-0 h-full max-h-72 py-10">
      <Button class="h-full border-none text-center" hx-get="/api/meals/modal" hx-target="#modal-portal">
        <>
          {icons['plus-circle'].toSvg({ class: 'mx-auto mb-2 w-12 h-12' })}
          <span>Add meal</span>
        </>
      </Button>
    </article>
  );
}
