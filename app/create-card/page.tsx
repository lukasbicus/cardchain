import { CardIcon, Colors, iconsMap } from '@/app/lib/shared';
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
          value={Colors.Khaki}
          options={Object.entries(Colors).map(([name, hex]) => ({
            label: (
              <div className="flex gap-2 items-center">
                <div className="w-4 h-4" style={{ backgroundColor: hex }} />
                <span>{name}</span>
              </div>
            ),
            value: hex,
          }))}
        />
        <DropdownField
          label="Category"
          value={CardIcon.Airlines}
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
