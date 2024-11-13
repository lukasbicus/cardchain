import { Routes } from '@/app/lib/shared';
import { MainMessage } from '@/app/ui/main-message';
import { PageTemplate } from '@/app/ui/page-template';
import { SecondaryHeader } from '@/app/ui/secondary-header';
import { IconCards } from '@tabler/icons-react';
import Link from 'next/link';

export function CardNotFoundPage({
  id,
  title,
}: {
  id: string | null;
  title: string;
}) {
  return (
    <PageTemplate
      header={
        <SecondaryHeader
          title={title}
          href={{
            pathname: Routes.Card,
            query: {
              id,
            },
          }}
        />
      }
    >
      <div className="flex h-2/3 w-full items-center justify-center">
        <MainMessage
          title="Card not found"
          description={`Something went wrong. The card with id ${String(id)} not found.`}
        >
          <Link href={Routes.MyCards} replace className="btn btn-primary">
            <IconCards className="w-6 h-6" />
            My cards
          </Link>
        </MainMessage>
      </div>
    </PageTemplate>
  );
}
