import { Routes } from '@/app/lib/shared';
import { PageTemplate } from '@/app/ui/page-template';
import { SecondaryHeader } from '@/app/ui/secondary-header';

export default function ImportDataPage() {
  return (
    <PageTemplate
      header={<SecondaryHeader title="Import data" href={Routes.Settings} />}
    >
      <div>Import data</div>
    </PageTemplate>
  );
}
