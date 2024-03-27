import { type ComponentProps } from '../../types';
import { Card } from '../Card';

type CardSectionProps = {
  title: string;
};

export async function CardSection({ title, children }: ComponentProps<CardSectionProps>) {
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
