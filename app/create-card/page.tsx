import { CardIcon, Colors, iconsMap } from '@/app/lib/shared';
import { DropdownField } from '@/app/ui/dropdown-field';
import PageTemplate from '@/app/ui/page-template';
import { TextAreaField } from '@/app/ui/text-area-field';
import { TextField } from '@/app/ui/text-field';
import { IconCamera, IconPalette } from '@tabler/icons-react';

export default function Page() {
  return (
    <PageTemplate
      header={
        <div>
          secondary header
          <div>Header</div>
          <div>Header</div>
          <div>Header</div>
          <div>Header</div>
          <div>Header</div>
          <div>Header</div>
          <div>Header</div>
        </div>
      }
    >
      <form className="px-4 py-6 w-full h-full">
        <div className="flex gap-8">
          <TextField label="Card number" />
          <button className="btn btn-primary btn-square mt-9">
            <IconCamera className="w-6 h-6" />
          </button>
        </div>
        <TextField label="Card name" />
        <TextAreaField label="Note" />
        <div className="flex gap-8">
          <DropdownField
            label="Color"
            dropdownClassName="dropdown-top"
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
          <button className="btn btn-primary btn-square mt-9">
            <IconPalette className="w-6 h-6" />
          </button>
        </div>
        <DropdownField
          label="Category"
          dropdownClassName="dropdown-top"
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
        <div className="h-32" />
        <footer className="btm-nav btm-nav-md text-base-content">
          <button className="btn btn-primary w-full">Submit</button>
        </footer>
      </form>
    </PageTemplate>
  );
}
