import CreateCardForm from '@/app/create-card/create-card-form';
import { Routes } from '@/app/lib/shared';
import { Loading } from '@/app/ui/loading';
import { PageTemplate } from '@/app/ui/page-template';
import { SecondaryHeader } from '@/app/ui/secondary-header';
import { Suspense } from 'react';

export default function Page() {
  return (
    <PageTemplate
      header={<SecondaryHeader title="Create a card" href={Routes.AddCards} />}
    >
      <Suspense fallback={<Loading />}>
        <CreateCardForm />
      </Suspense>
    </PageTemplate>
  );
}
