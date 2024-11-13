import { EditCardPage } from '@/app/edit-card/edit-card-page';
import { Loading } from '@/app/ui/loading';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <EditCardPage />
    </Suspense>
  );
}
