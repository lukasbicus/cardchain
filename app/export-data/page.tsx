import { ExportDataPage } from '@/app/export-data/export-data-page';
import { Routes } from '@/app/lib/shared';
import { Loading } from '@/app/ui/loading';
import { PageTemplate } from '@/app/ui/page-template';
import { SecondaryHeader } from '@/app/ui/secondary-header';
import { Suspense } from 'react';

export default function Page() {
  return (
    <PageTemplate
      header={<SecondaryHeader title="Export data" href={Routes.Settings} />}
    >
      <Suspense fallback={<Loading />}>
        <ExportDataPage />
      </Suspense>
    </PageTemplate>
  );
}
