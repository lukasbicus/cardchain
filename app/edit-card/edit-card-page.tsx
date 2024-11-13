'use client';

import useAppState from '@/app/lib/app-state/app-state';
import { Routes } from '@/app/lib/shared';
import { MainMessage } from '@/app/ui/main-message';
import { PageTemplate } from '@/app/ui/page-template';
import { SecondaryHeader } from '@/app/ui/secondary-header';
import { IconCards } from '@tabler/icons-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export function EditCardPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [state] = useAppState();
  const card = state.cards.find(c => c.id === id);
  if (!card) {
    return (
      <PageTemplate
        header={
          <SecondaryHeader
            title="Edit card detail"
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
            description={`Something went wrong. The card with id ${id} not found.`}
          >
            <Link href={Routes.MyCards} replace>
              <button className="btn btn-primary">
                <IconCards className="w-6 h-6" />
                My cards
              </button>
            </Link>
          </MainMessage>
        </div>
      </PageTemplate>
    );
  }
  return (
    <PageTemplate
      header={<SecondaryHeader title={card!.name} href={Routes.MyCards} />}
    >
      Form
    </PageTemplate>
  );
}
