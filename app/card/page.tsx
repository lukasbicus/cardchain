import { CardDetailPage } from '@/app/card/card-detail-page';
import { Loading } from '@/app/ui/loading';
import { Suspense } from 'react';

export default function CardPage() {
  return (
    <Suspense fallback={<Loading />}>
      <CardDetailPage />
    </Suspense>
  );
}
