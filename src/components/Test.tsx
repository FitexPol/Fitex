import Html from "@kitajs/html";

export type Item = {
  name: string;
}

type TestProps = {
  items: Item[];
};

export default function Test({ children, items }: Html.PropsWithChildren<TestProps>) {
  return (
    <>
      <ul>
        {items.map(({ name }) => <li>{name}</li>)}
      </ul>

      {children}
    </>
  );
}