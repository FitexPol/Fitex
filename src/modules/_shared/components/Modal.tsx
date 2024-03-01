import { icons } from 'feather-icons';

import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { type ComponentProps } from '@types';

type ModalProps = {
  title: string;
};

export function Modal({ title, children }: ComponentProps<ModalProps>) {
  return (
    <Card>
      <>
        <Card.Header title={<h2 class="text-lg">{title}</h2>} class="relative">
          <Button class="pico-reset absolute right-3 top-3" onclick="closeModal()">
            {icons['x-circle'].toSvg()}
          </Button>
        </Card.Header>

        {children}
      </>
    </Card>
  );
}
