import { type ComponentProps } from '../types';

type ModalProps = {
  title: string;
};

export function Modal({ title, children }: ComponentProps<ModalProps>) {
  return (
    <article class="m-0">
      <header>
        <span aria-label="Close" class="close cursor-pointer" onclick="closeModal()"></span>
        <h3>{title}</h3>
      </header>

      {children}
    </article>
  );
}
