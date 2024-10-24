import { iconsMap } from '@/app/lib/shared';
import { DropdownField } from '@/app/ui/dropdown-field';
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
        <DropdownField
          label="Color"
          options={[
            {
              label: 'red',
              value: 'red',
            },
          ]}
        />
        <DropdownField
          label="Category"
          options={Object.entries(iconsMap).map(([key, Icon]) => ({
            label: (
              <span>
                <Icon className="w-6 h-6" />
              </span>
            ),
            value: key,
          }))}
        />
      </form>
    </PageTemplate>
  );
}
