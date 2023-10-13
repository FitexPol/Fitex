type Class = {
  class?: string;
};

type Children = {
  children?: JSX.Element
};

export type ComponentProps<Props = object> = Props & Class & Children;


