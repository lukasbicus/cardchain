import PageTemplate from '@/app/ui/page-template';
import { TextAreaField } from '@/app/ui/text-area-field';
import { TextField } from '@/app/ui/text-field';

export default function Page() {
  return (
    <PageTemplate header={<>secondary header</>}>
      <div>Scan card page</div>
      <form className="px-4 py-6">
        <TextField label="Card number" />
        <TextField label="Card name" />
        <TextAreaField label="Note" />
      </form>
    </PageTemplate>
  );
}
