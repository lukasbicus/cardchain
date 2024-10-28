import CreateCardForm from '@/app/create-card/create-card-form';
import { Routes } from '@/app/lib/shared';
import PageTemplate from '@/app/ui/page-template';
import { SecondaryHeader } from '@/app/ui/secondary-header';

export default function Page() {
  return (
    <PageTemplate
      header={<SecondaryHeader title="Create a card" href={Routes.AddCards} />}
    >
      <CreateCardForm />
    </PageTemplate>
  );
}
