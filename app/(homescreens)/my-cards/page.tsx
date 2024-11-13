import MyCardsPage from '@/app/(homescreens)/my-cards/my-cards-page';
import { Loading } from '@/app/ui/loading';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <MyCardsPage />
    </Suspense>
  );
}
