'use client';

import useAppState from '@/app/lib/app-state/app-state';
import { Routes } from '@/app/lib/shared';
import PageTemplate from '@/app/ui/page-template';
import { SecondaryHeader } from '@/app/ui/secondary-header';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useSearchParams } from 'next/navigation';

export function CardDetailPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [state, dispatch] = useAppState();
  const card = state.cards.find(c => c.id === id);
  if (!card) {
    return (
      <PageTemplate
        header={<SecondaryHeader title="Card detail" href={Routes.MyCards} />}
      >
        card not found
      </PageTemplate>
    );
  }
  return (
    <PageTemplate
      header={
        <SecondaryHeader
          title={card!.name}
          href={Routes.MyCards}
          rightAction={
            <div className="flex gap-2">
              <button className="btn btn-square btn-ghost">
                <IconTrash />
              </button>
              <button className="btn btn-square btn-ghost">
                <IconEdit />
              </button>
            </div>
          }
        />
      }
    >
      <div>card</div>
      <div>{card.name}</div>
      <div>{card.id}</div>
      <div>{card.code}</div>
      <div>{card.note}</div>
      <div>{card.bgColor}</div>
      <div>{JSON.stringify(card.icon)}</div>
      <div>{card.favorite}</div>
      <div>{card.codeFormat}</div>
    </PageTemplate>
  );
}
