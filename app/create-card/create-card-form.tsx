'use client';

import useAppState from '@/app/lib/app-state/app-state';
import { predefinedCompanies } from '@/app/lib/predefined-companies';
import {
  CardIcon,
  CodeType,
  colorNames,
  iconsMap,
  Routes,
} from '@/app/lib/shared';
import { DropdownField } from '@/app/ui/dropdown-field';
import { TextAreaField } from '@/app/ui/text-area-field';
import { TextField } from '@/app/ui/text-field';
import { IconCamera, IconPalette } from '@tabler/icons-react';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
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
  const searchParams = useSearchParams();
  const predefinedCompanyName = searchParams.get('predefinedCompany');
  const predefinedCompany = predefinedCompanies.find(
    c => c.name === predefinedCompanyName
  );
  const { register, handleSubmit, control, watch } = useForm<CreateCardForm>({
    defaultValues: predefinedCompany
      ? {
          [FormNames.Name]: predefinedCompany.name,
          [FormNames.Color]: predefinedCompany.bgColor,
          [FormNames.Icon]: predefinedCompany.svg,
          [FormNames.CodeType]: predefinedCompany.codeType,
        }
      : {
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
      {predefinedCompany ? (
        <input type="hidden" {...register(FormNames.Color)} />
      ) : (
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
      )}
      {predefinedCompany ? (
        <label className={'form-control w-full'}>
          <div className="label">
            <span className="label-text">Company logo</span>
          </div>
          <div style={{ backgroundColor: predefinedCompany.bgColor }}>
            <input type="hidden" {...register(FormNames.Icon)} />
            <Image
              src={predefinedCompany.svg}
              alt={predefinedCompany.name}
              className="w-24 h-24"
            />
          </div>
        </label>
      ) : (
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
      )}
      <div className="h-32" />
      <footer className="btm-nav btm-nav-md text-base-content px-4">
        <button className="btn btn-primary w-full" type="submit">
          Create card
        </button>
      </footer>
    </form>
  );
}
