import { type ComponentProps } from '../../types';
import { Card } from '../Card';

type FormSectionProps = {
  title: string;
};

export async function FormSection({ title, children }: ComponentProps<FormSectionProps>) {
  return (
    <section>
      <Card>
        <>
          <Card.Header title={<h1 class="mb-0 text-2xl">{title}</h1>} />
          {children}
        </>
      </Card>
    </section>
  );
}
