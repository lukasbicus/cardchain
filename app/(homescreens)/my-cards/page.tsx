import MyCards from '@/app/(homescreens)/my-cards/my-cards';
import Loading from '@/app/ui/loading';
import { Suspense } from 'react';

export default function Page() {
  return (
    <main>
      My cards
      <Suspense fallback={<Loading />}>
        <MyCards />
      </Suspense>
    </main>
  );
}
