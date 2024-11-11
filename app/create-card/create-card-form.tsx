'use client';

import Scanner from '@/app/create-card/scanner';
import {
  initialState,
  CreateCardFormActions,
  CreateCardFormActionTypes,
  createCardFormReducer,
  CreateCardFormState,
} from '@/app/create-card/createCardFormReducer';
import useAppState from '@/app/lib/app-state/app-state';
import { mapHtml5QrcodeFormatToJsbarcodeFormat } from '@/app/lib/app-state/codeFormat';
import { predefinedCompanies } from '@/app/lib/predefined-companies';
import {
  CardIcon,
  colorNames,
  iconsMap,
  Routes,
  SvgProps,
} from '@/app/lib/shared';
import { CodePicture } from '@/app/ui/code-picture';
import { DropdownField } from '@/app/ui/dropdown-field';
import { TextAreaField } from '@/app/ui/text-area-field';
import { TextField } from '@/app/ui/text-field';
import {
  IconCamera,
  IconPalette,
  IconRefresh,
  IconX,
} from '@tabler/icons-react';
import { Html5QrcodeResult } from 'html5-qrcode';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Reducer, useCallback, useEffect, useReducer, useRef } from 'react';
import { useForm } from 'react-hook-form';

enum CreateCardFormNames {
  Name = 'name',
  Code = 'code',
  CodeFormat = 'codeFormat',
  Note = 'note',
  Color = 'color',
  Icon = 'Icon',
}

type CreateCardForm = {
  [CreateCardFormNames.Name]: string;
  [CreateCardFormNames.Code]: string;
  [CreateCardFormNames.CodeFormat]: string;
  [CreateCardFormNames.Note]: string;
  [CreateCardFormNames.Color]: string | null;
  [CreateCardFormNames.Icon]: string | SvgProps;
};

export default function CreateCardForm() {
  const searchParams = useSearchParams();
  const predefinedCompanyName = searchParams.get('predefinedCompany');
  const predefinedCompany = predefinedCompanies.find(
    c => c.name === predefinedCompanyName
  );
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors: formErrors },
  } = useForm<CreateCardForm>({
    defaultValues: predefinedCompany
      ? {
          [CreateCardFormNames.Name]: predefinedCompany.name,
          [CreateCardFormNames.Color]: null,
          [CreateCardFormNames.Icon]: predefinedCompany.svg,
        }
      : {},
  });
  const [, appDispatch] = useAppState();
  const [{ devices, activeDevice, isModalVisible }, dispatch] = useReducer<
    Reducer<CreateCardFormState, CreateCardFormActions>
  >(createCardFormReducer, initialState);
  const router = useRouter();
  const cameraModalRef = useRef<HTMLDialogElement>(null);
  const handleCodeDetected = useCallback(
    (text: string, { result }: Html5QrcodeResult) => {
      setValue(CreateCardFormNames.Code, text, {
        shouldValidate: true,
      });
      if (typeof result.format?.format === 'number') {
        setValue(
          CreateCardFormNames.CodeFormat,
          mapHtml5QrcodeFormatToJsbarcodeFormat(result.format.format)
        );
      }
      cameraModalRef.current?.close();
    },
    [setValue]
  );
  useEffect(() => {
    const cameraModal = cameraModalRef.current;

    const observer = new MutationObserver(function observerCallback(
      mutations: MutationRecord[]
    ) {
      for (const mutation of mutations) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'open'
        ) {
          if (cameraModal) {
            dispatch({
              type: CreateCardFormActionTypes.UPDATE_MODAL_VISIBILITY,
              payload: cameraModal.open,
            });
          }
        }
      }
    });

    if (cameraModal) {
      observer.observe(cameraModal, { attributes: true });
    }
    return () => {
      if (cameraModal) {
        observer.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    cameraModalRef.current?.showModal();
  }, []);

  const code = watch(CreateCardFormNames.Code);
  const codeFormat = watch(CreateCardFormNames.CodeFormat);
  return (
    <>
      <form
        className="px-4 py-6 w-full h-full"
        onSubmit={handleSubmit(data => {
          appDispatch({
            type: 'ADD_CARD',
            payload: {
              name: data[CreateCardFormNames.Name],
              code: data[CreateCardFormNames.Code],
              note: data[CreateCardFormNames.Note] || undefined,
              bgColor: data[CreateCardFormNames.Color] || null,
              icon: (data[CreateCardFormNames.Icon] as CardIcon) || null,
              codeFormat: data[CreateCardFormNames.CodeFormat],
            },
          });
          router.replace(Routes.MyCards);
        })}
      >
        {code && codeFormat && (
          <CodePicture code={code} codeFormat={codeFormat} />
        )}
        <div className="flex gap-4">
          <TextField
            label="Card code"
            name={CreateCardFormNames.Code}
            register={register}
            disabled
            errors={formErrors}
            required
          />
          <button
            className="btn btn-primary btn-square mt-9"
            onClick={() => {
              cameraModalRef.current?.showModal();
            }}
            type="button"
          >
            <IconCamera className="w-6 h-6" />
          </button>
        </div>
        <TextField
          label="Card name"
          name={CreateCardFormNames.Name}
          register={register}
          required
          errors={formErrors}
        />
        <TextAreaField
          label="Note"
          name={CreateCardFormNames.Note}
          register={register}
        />
        {predefinedCompany ? (
          <input type="hidden" {...register(CreateCardFormNames.Color)} />
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
              name={CreateCardFormNames.Color}
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
            <div className="bg-background">
              <input type="hidden" {...register(CreateCardFormNames.Icon)} />
              <Image
                {...predefinedCompany.svg}
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
            name={CreateCardFormNames.Icon}
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
      <dialog className="modal" ref={cameraModalRef}>
        <div className="modal-box w-full h-full max-h-full max-w-full overflow-clip lg:w-11/12 lg:h-5/6 lg:max-w-5xl lg:max-h-5xl">
          <div className="grid justify-between items-center pb-4 grid-cols-[auto_1fr_auto] gap-4">
            <button
              className="btn btn-square btn-ghost"
              onClick={() => cameraModalRef.current?.close()}
            >
              <IconX className="w-6 h-6" />
            </button>
            <h3 className="font-bold text-lg">Scan your code!</h3>
            {devices.length > 1 ? (
              <button
                className="btn btn-square btn-ghost"
                onClick={() => {
                  dispatch({
                    type: CreateCardFormActionTypes.TOGGLE_ACTIVE_DEVICE,
                  });
                }}
              >
                <IconRefresh className="w-6 h-6" />
              </button>
            ) : null}
          </div>
          {isModalVisible && (
            <Scanner
              onCodeDetected={handleCodeDetected}
              activeDevice={activeDevice}
              dispatch={dispatch}
            />
          )}
        </div>
      </dialog>
    </>
  );
}
