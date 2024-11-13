import { ImportDataPage } from '@/app/import-data/import-data-page';
import { Routes } from '@/app/lib/shared';
import { Loading } from '@/app/ui/loading';
import { PageTemplate } from '@/app/ui/page-template';
import { SecondaryHeader } from '@/app/ui/secondary-header';
import { Suspense } from 'react';

export default function Page() {
  return (
    <PageTemplate
      header={<SecondaryHeader title="Import data" href={Routes.Settings} />}
    >
      <Suspense fallback={<Loading />}>
        <ImportDataPage />
      </Suspense>
    </PageTemplate>
  );
}
