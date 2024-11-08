import { PredefinedCompaniesList } from '@/app/(homescreens)/add-cards/predefined-companies-list';
import { Routes } from '@/app/lib/shared';
import { Loading } from '@/app/ui/loading';
import { PageTemplate } from '@/app/ui/page-template';
import { PrimaryHeader } from '@/app/ui/primary-header';
import { Search } from '@/app/ui/search';
import { IconLayoutGrid, IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { Suspense } from 'react';

export default function Page() {
  return (
    <PageTemplate
      header={
        <PrimaryHeader
          title="Add cards"
          actions={
            <Link href={Routes.CreateCard}>
              <button className="btn btn-primary">
                <IconPlus className="w-6 h-6" />
                Add card
              </button>
            </Link>
          }
        >
          <>
            <Suspense fallback={<Loading />}>
              <Search className="flex-1" />
            </Suspense>
            <button className="btn btn-circle btn-ghost">
              <IconLayoutGrid className="w-6 h-6" />
            </button>
          </>
        </PrimaryHeader>
      }
    >
      <Suspense fallback={<Loading />}>
        <PredefinedCompaniesList />
      </Suspense>
    </PageTemplate>
  );
}
