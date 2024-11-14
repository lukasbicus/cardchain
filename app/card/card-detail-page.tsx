'use client';

import { CardNotFoundPage } from '@/app/ui/card-not-found-page';
import { CodePicture } from '@/app/ui/code-picture';
import { ConfirmDialog } from '@/app/ui/confirm-dialog';
import { useAppState, AppActionTypes } from '@/app/ui/app-state';
import { Routes } from '@/app/lib/shared';
import { CompanyIcon } from '@/app/ui/company-icon';
import { PageTemplate } from '@/app/ui/page-template';
import { SecondaryHeader } from '@/app/ui/secondary-header';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRef } from 'react';

export function CardDetailPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [state, dispatch] = useAppState();
  const card = state.cards.find(c => c.id === id);
  const deleteDialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  if (!card) {
    return <CardNotFoundPage id={id} title="Card detail" />;
  }
  return (
    <PageTemplate
      header={
        <SecondaryHeader
          title={card!.name}
          href={Routes.MyCards}
          rightAction={
            <div className="flex gap-2">
              <button
                className="btn btn-square btn-ghost"
                onClick={() => {
                  deleteDialogRef.current?.showModal();
                }}
              >
                <IconTrash />
              </button>
              <Link
                href={{
                  pathname: Routes.EditCard,
                  query: { id: card.id },
                }}
                replace
                className="btn btn-square btn-ghost"
              >
                <IconEdit />
              </Link>
            </div>
          }
        />
      }
    >
      <div className="h-full w-full grid grid-col grid-rows-[1fr_auto]">
        <CodePicture code={card.code} codeFormat={card.codeFormat} />
        <div
          className="bg-base-300 p-6"
          style={card.bgColor ? { backgroundColor: card.bgColor } : {}}
        >
          <div className="flex gap-6 items-center">
            <CompanyIcon {...card} className="w-16 h-16" />
            <label className="form-control flex-1 pointer-events-none">
              <div className="label">
                <span className="label-text">Card name</span>
              </div>
              <input
                type="text"
                value={card.name}
                className="input input-bordered w-full input-ghost pointer-events-none"
              />
            </label>
          </div>

          <label className="form-control">
            <div className="label">
              <span className="label-text">Toggle note visibility</span>
            </div>
            <input type="checkbox" className="toggle" defaultChecked />
          </label>
          <label className="form-control pointer-events-none">
            <div className="label">
              <span className="label-text">Card note</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24 textarea-ghost pointer-events-none"
              value={card.note}
            />
          </label>
        </div>
      </div>
      <ConfirmDialog
        ref={deleteDialogRef}
        title="Delete card"
        body={`Do you really want to delete card ${card.name}? This action is irreversible.`}
        confirmButtonLabel="Delete"
        onConfirmButtonClick={() => {
          dispatch({
            type: AppActionTypes.DeleteCard,
            payload: { id: card.id },
          });
          router.replace(Routes.MyCards);
        }}
        onCancelButtonClick={() => {
          deleteDialogRef.current?.close();
        }}
      />
    </PageTemplate>
  );
}
