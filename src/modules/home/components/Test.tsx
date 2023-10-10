export type Item = {
  name: string;
};

type TestProps = {
  children: JSX.Element;
  items: Item[];
};

export default function Test({ children, items }: TestProps) {
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
