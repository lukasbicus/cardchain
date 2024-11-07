'use client';

import { ConfirmDialog } from '@/app/ui/confirm-dialog';
import useAppState from '@/app/lib/app-state/app-state';
import { Routes } from '@/app/lib/shared';
import { Barcode } from '@/app/ui/barcode';
import { CompanyIcon } from '@/app/ui/company-icon';
import { MainMessage } from '@/app/ui/main-message';
import { PageTemplate } from '@/app/ui/page-template';
import { Qrcode } from '@/app/ui/qrcode';
import { SecondaryHeader } from '@/app/ui/secondary-header';
import { IconCards, IconEdit, IconTrash } from '@tabler/icons-react';
import Link from 'next/link';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { useRef } from 'react';

export function CardDetailPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [state, dispatch] = useAppState();
  const card = state.cards.find(c => c.id === id);
  const deleteDialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  if (!card) {
    return (
      <PageTemplate
        header={<SecondaryHeader title="Card detail" href={Routes.MyCards} />}
      >
        <div className="flex h-2/3 w-full items-center justify-center">
          <MainMessage
            title="Card not found"
            description={`Something went wrong. Found with id ${id} not found.`}
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
              <Link href={Routes.MyCards} replace>
                <button className="btn btn-square btn-ghost">
                  <IconEdit />
                </button>
              </Link>
            </div>
          }
        />
      }
    >
      <div className="h-full w-full grid grid-col grid-rows-[1fr_auto]">
        {card.codeFormat === 'QR' ? (
          <Qrcode code={card.code} />
        ) : (
          <Barcode code={card.code} codeFormat={card.codeFormat} />
        )}
        <div
          className="bg-base-300 p-6"
          style={card.bgColor ? { backgroundColor: card.bgColor } : {}}
        >
          <div className="flex gap-6 items-center">
            <CompanyIcon {...card} className="w-16 h-16" />
            <label className="form-control flex-1">
              <div className="label">
                <span className="label-text">Card name</span>
              </div>
              <input
                type="text"
                disabled
                value={card.name}
                className="input input-bordered w-full"
              />
            </label>
          </div>

          <label className="form-control">
            <div className="label">
              <span className="label-text">Toggle note visibility</span>
            </div>
            <input type="checkbox" className="toggle" defaultChecked />
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Card note</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24"
              value={card.note}
              disabled
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
            type: 'DELETE_CARD',
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
