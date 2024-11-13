'use client';

import { useAppState } from '@/app/ui/app-state/app-state-context';
import { Routes } from '@/app/lib/shared';
import { CardNotFoundPage } from '@/app/ui/card-not-found-page';
import { PageTemplate } from '@/app/ui/page-template';
import { SecondaryHeader } from '@/app/ui/secondary-header';
import { useSearchParams } from 'next/navigation';

export function EditCardPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [state] = useAppState();
  const card = state.cards.find(c => c.id === id);
  if (!card) {
    return <CardNotFoundPage id={id} title="Edit card detail" />;
  }
  return (
    <PageTemplate
      header={<SecondaryHeader title={card!.name} href={Routes.MyCards} />}
    >
      Form
    </PageTemplate>
  );
}
