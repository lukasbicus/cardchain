import { CardIcon, Colors, iconsMap, Routes } from '@/app/lib/shared';
import { DropdownField } from '@/app/ui/dropdown-field';
import PageTemplate from '@/app/ui/page-template';
import { SecondaryHeader } from '@/app/ui/secondary-header';
import { TextAreaField } from '@/app/ui/text-area-field';
import { TextField } from '@/app/ui/text-field';
import { IconCamera, IconPalette } from '@tabler/icons-react';
import Link from 'next/link';

export default function Page() {
  return (
    <PageTemplate
      header={<SecondaryHeader title="Create a card" href={Routes.AddCards} />}
    >
      <form className="px-4 py-6 w-full h-full">
        <div className="flex gap-4">
          <TextField label="Card number" />
          <Link
            className="btn btn-primary btn-square mt-9"
            href={Routes.ScanCard}
          >
            <IconCamera className="w-6 h-6" />
          </Link>
        </div>
        <TextField label="Card name" />
        <TextAreaField label="Note" />
        <div className="flex gap-4">
          <DropdownField
            label="Background color"
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
          label="Icon"
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
        <footer className="btm-nav btm-nav-md text-base-content px-4">
          <button className="btn btn-primary w-full">Create card</button>
        </footer>
      </form>
    </PageTemplate>
  );
}
