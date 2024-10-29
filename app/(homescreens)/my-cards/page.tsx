import MyCards from '@/app/(homescreens)/my-cards/my-cards';
import { Routes } from '@/app/lib/shared';
import Loading from '@/app/ui/loading';
import PageTemplate from '@/app/ui/page-template';
import { PrimaryHeader } from '@/app/ui/primary-header';
import { IconLayoutGrid, IconSearch, IconStar } from '@tabler/icons-react';
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
          <div className="form-control flex-1">
            <label className="input input-bordered flex items-center gap-2 w-full">
              <input type="text" className="grow w-full" placeholder="Search" />
              <IconSearch className="h-4 w-4 opacity-70"></IconSearch>
            </label>
          </div>
        </PrimaryHeader>
      }
    >
      My cards
      <Suspense fallback={<Loading />}>
        <MyCards />
      </Suspense>
    </PageTemplate>
  );
}
