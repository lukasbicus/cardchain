'use client';

import useAppState from '@/app/lib/app-state/app-state';
import {
  CardIcon,
  CodeType,
  colorNames,
  Colors,
  iconsMap,
  Routes,
} from '@/app/lib/shared';
import { DropdownField } from '@/app/ui/dropdown-field';
import { TextAreaField } from '@/app/ui/text-area-field';
import { TextField } from '@/app/ui/text-field';
import { IconCamera, IconPalette } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

enum FormNames {
  Name = 'name',
  Code = 'code',
  CodeType = 'codeType',
  Note = 'note',
  Color = 'color',
  Icon = 'Icon',
}

type CreateCardForm = {
  [FormNames.Name]: string;
  [FormNames.Code]: string;
  [FormNames.CodeType]: string;
  [FormNames.Note]: string;
  [FormNames.Color]: string;
  [FormNames.Icon]: string;
};

export default function CreateCardForm() {
  const { register, handleSubmit, control, watch } = useForm<CreateCardForm>({
    defaultValues: {
      [FormNames.Color]: Colors.Khaki,
      [FormNames.CodeType]: CodeType.Barcode,
    },
  });
  const [, dispatch] = useAppState();
  const router = useRouter();
  return (
    <form
      className="px-4 py-6 w-full h-full"
      onSubmit={handleSubmit(data => {
        console.log('data', data);
        dispatch({
          type: 'ADD_CARD',
          payload: {
            name: data[FormNames.Name],
            code: data[FormNames.Code],
            note: data[FormNames.Note] || undefined,
            bgColor: data[FormNames.Color] || null,
            icon: (data[FormNames.Icon] as CardIcon) || null,
            codeType: data[FormNames.CodeType] as CodeType,
          },
        });
        router.replace(Routes.MyCards);
      })}
    >
      <div className="flex gap-4">
        <TextField
          label="Card code"
          name={FormNames.Code}
          register={register}
        />
        <Link
          className="btn btn-primary btn-square mt-9"
          href={Routes.ScanCard}
        >
          <IconCamera className="w-6 h-6" />
        </Link>
      </div>
      <TextField label="Card name" name={FormNames.Name} register={register} />
      <TextAreaField label="Note" name={FormNames.Note} register={register} />
      <div className="flex gap-4">
        <DropdownField
          label="Background color"
          dropdownClassName="dropdown-top"
          options={Object.entries(colorNames).map(([hex, name]) => ({
            label: (
              <div className="flex gap-2 items-center">
                <div className="w-4 h-4" style={{ backgroundColor: hex }} />
                <span>{name}</span>
              </div>
            ),
            value: hex,
          }))}
          control={control}
          name={FormNames.Color}
          watch={watch}
        />
        <button className="btn btn-primary btn-square mt-9">
          <IconPalette className="w-6 h-6" />
        </button>
      </div>
      <DropdownField
        label="Icon"
        dropdownClassName="dropdown-top"
        options={Object.entries(iconsMap).map(([key, Icon]) => ({
          label: (
            <span>
              <Icon className="w-6 h-6" />
            </span>
          ),
          value: key,
        }))}
        control={control}
        name={FormNames.Icon}
        watch={watch}
      />
      <div className="h-32" />
      <footer className="btm-nav btm-nav-md text-base-content px-4">
        <button className="btn btn-primary w-full" type="submit">
          Create card
        </button>
      </footer>
    </form>
  );
}
