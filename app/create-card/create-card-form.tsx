'use client';

import CardForm, {
  CardFormNames,
  TCardForm,
} from '@/app/ui/card-form/card-form';
import { useAppState } from '@/app/ui/app-state/app-state-context';
import { AppActionTypes } from '@/app/ui/app-state/reducer';
import { predefinedCompanies } from '@/app/lib/predefined-companies';
import { CardIcon, Routes } from '@/app/lib/shared';
import { useRouter, useSearchParams } from 'next/navigation';

export default function CreateCardForm() {
  const searchParams = useSearchParams();
  const predefinedCompanyName = searchParams.get('predefinedCompany');
  const predefinedCompany = predefinedCompanies.find(
    c => c.name === predefinedCompanyName
  );
  const [, appDispatch] = useAppState();
  const router = useRouter();

  return (
    <>
      <CardForm
        submitButtonLabel="Create card"
        defaultValues={
          predefinedCompany
            ? {
                [CardFormNames.Name]: predefinedCompany.name,
                [CardFormNames.Code]: '',
                [CardFormNames.CodeFormat]: '',
                [CardFormNames.Note]: '',
                [CardFormNames.Color]: null,
                [CardFormNames.Icon]: predefinedCompany.svg,
              }
            : undefined
        }
        onSubmit={(form: TCardForm) => {
          appDispatch({
            type: AppActionTypes.AddCard,
            payload: {
              name: form[CardFormNames.Name],
              code: form[CardFormNames.Code],
              note: form[CardFormNames.Note] || undefined,
              bgColor: form[CardFormNames.Color] || null,
              icon: (form[CardFormNames.Icon] as CardIcon) || null,
              codeFormat: form[CardFormNames.CodeFormat],
            },
          });
          router.replace(Routes.MyCards);
        }}
        hideColorDropdown={Boolean(predefinedCompany)}
        openScannerOnInit
      />
    </>
  );
}
