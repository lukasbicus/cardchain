import { Routes } from '@/app/lib/shared';
import { PageTemplate } from '@/app/ui/page-template';
import { PrimaryHeader } from '@/app/ui/primary-header';
import Link from 'next/link';

export default function Page() {
  return (
    <PageTemplate header={<PrimaryHeader title="Settings" />}>
      <div className="flex flex-col gap-2 px-2 py-3 w-full">
        <Link href={Routes.ExportData}>
          <button className="btn btn-primary w-full">Export data</button>
        </Link>
        <Link href={Routes.ImportData}>
          <button className="btn btn-primary w-full">Import data</button>
        </Link>
        <Link href={Routes.About}>
          <button className="btn btn-primary w-full">About</button>
        </Link>
        <Link href={Routes.AboutAuthor}>
          <button className="btn btn-primary w-full">About author</button>
        </Link>
      </div>
    </PageTemplate>
  );
}
