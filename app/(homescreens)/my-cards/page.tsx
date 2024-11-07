import MyCards from '@/app/(homescreens)/my-cards/my-cards';
import { Routes } from '@/app/lib/shared';
import Loading from '@/app/ui/loading';
import PageTemplate from '@/app/ui/page-template';
import { PrimaryHeader } from '@/app/ui/primary-header';
import { Search } from '@/app/ui/search';
import { IconLayoutGrid, IconStar } from '@tabler/icons-react';
import Link from 'next/link';
import { Suspense } from 'react';

export default function Page() {
  return (
    <PageTemplate
      header={
        <PrimaryHeader
          title="My cards"
          actions={
            <>
              <Link href={Routes.CreateCard}>
                <button className="btn btn-square btn-primary btn-outline">
                  <IconStar className="w-6 h-6" />
                </button>
              </Link>
              <Link href={Routes.CreateCard}>
                <button className="btn btn-square btn-primary btn-outline">
                  <IconLayoutGrid className="w-6 h-6" />
                </button>
              </Link>
            </>
          }
        >
          <Search className="flex-1" />
        </PrimaryHeader>
      }
    >
      <Suspense fallback={<Loading />}>
        <MyCards />
      </Suspense>
    </PageTemplate>
  );
}
