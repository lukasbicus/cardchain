import { ExportDataPage } from '@/app/export-data/export-data-page';
import { Routes } from '@/app/lib/shared';
import { PageTemplate } from '@/app/ui/page-template';
import { SecondaryHeader } from '@/app/ui/secondary-header';

export default function Page() {
  return (
    <PageTemplate
      header={<SecondaryHeader title="Export data" href={Routes.Settings} />}
    >
      <ExportDataPage />
    </PageTemplate>
  );
}
