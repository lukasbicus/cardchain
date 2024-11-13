'use client';

import { CardIcon, Routes } from '@/app/lib/shared';
import { useAppState } from '@/app/ui/app-state/app-state-context';
import { AppActionTypes } from '@/app/ui/app-state/reducer';
import CardForm, {
  CardFormNames,
  TCardForm,
} from '@/app/ui/card-form/card-form';
import { CardNotFoundPage } from '@/app/ui/card-not-found-page';
import { PageTemplate } from '@/app/ui/page-template';
import { SecondaryHeader } from '@/app/ui/secondary-header';
import { useRouter, useSearchParams } from 'next/navigation';

export function EditCardPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [state, dispatch] = useAppState();
  const card = state.cards.find(c => c.id === id);
  const router = useRouter();
  if (!card) {
    return <CardNotFoundPage id={id} title="Edit card detail" />;
  }
  return (
    <PageTemplate
      header={
        <SecondaryHeader
          title={card!.name}
          href={{ pathname: Routes.Card, query: { id: card.id } }}
        />
      }
    >
      <CardForm
        submitButtonLabel="Save card"
        defaultValues={{
          [CardFormNames.Name]: card.name,
          [CardFormNames.Code]: card.code,
          [CardFormNames.CodeFormat]: card.codeFormat,
          [CardFormNames.Note]: card.note ?? '',
          [CardFormNames.Color]: card.bgColor,
          [CardFormNames.Icon]: card.icon ?? null,
        }}
        onSubmit={(form: TCardForm) => {
          dispatch({
            type: AppActionTypes.EditCard,
            payload: {
              id: card.id,
              updatedCard: {
                id: card.id,
                name: form[CardFormNames.Name],
                code: form[CardFormNames.Code],
                note: form[CardFormNames.Note] || undefined,
                bgColor: form[CardFormNames.Color] || null,
                icon: (form[CardFormNames.Icon] as CardIcon) || null,
                codeFormat: form[CardFormNames.CodeFormat],
              },
            },
          });
          router.replace(`${Routes.Card}?id=${card.id}`);
        }}
      />
    </PageTemplate>
  );
}
