import type { ComponentProps } from '../types';
import $tm from '../utils/$tm';

type InputProps = {
  type: 'text' | 'email' | 'password' | 'submit';
  name?: string;
  placeholder?: string;
  value?: string;
  error?: string;
};

export default function Input({ error, ...attr }: Omit<ComponentProps<InputProps>, 'children'>) {
  const renderInputElement = () => <input {...attr} class={$tm(error && 'border-red-600')} />;

  return attr.type === 'submit' ? (
    renderInputElement()
  ) : (
    <label class={$tm('relative mb-0 pb-2')}>
      {renderInputElement()}
      {error && <span class="absolute bottom-1.5 left-0 px-4 text-xs text-red-600">{error}</span>}
    </label>
  );
}
