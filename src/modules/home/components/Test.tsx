import type { ComponentProps } from '@types';

export type Item = {
  name: string;
};

type TestProps = {
  items: Item[];
};

export function Test({ children, items }: ComponentProps<TestProps>) {
  return (
    <>
      {children}

      <ul>
        {items.map(({ name }) => (
          <li>{name}</li>
        ))}
      </ul>
    </>
  );
}
