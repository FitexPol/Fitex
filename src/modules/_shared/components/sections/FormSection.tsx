import { type ComponentProps } from '../../types';
import { Card } from '../Card';
import { FloatingLink } from '../FloatingLink';

type FormSectionProps = {
  title: string;
  floatingLinkHref: string;
};

export async function FormSection({ title, floatingLinkHref, children }: ComponentProps<FormSectionProps>) {
  return (
    <section class="mb-20">
      <Card>
        <>
          <Card.Header title={<h1 class="mb-0 text-2xl">{title}</h1>} />
          {children}
        </>
      </Card>

      <FloatingLink href={floatingLinkHref} icon="arrow-left" />
    </section>
  );
}
