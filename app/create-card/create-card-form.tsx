'use client';

import Scanner from '@/app/create-card/scanner';
import {
  initialState,
  ScannerActions,
  ScannerActionTypes,
  scannerReducer,
  ScannerState,
} from '@/app/create-card/scannerReducer';
import useAppState from '@/app/lib/app-state/app-state';
import { predefinedCompanies } from '@/app/lib/predefined-companies';
import {
  CardIcon,
  colorNames,
  iconsMap,
  Routes,
  SvgProps,
} from '@/app/lib/shared';
import { DropdownField } from '@/app/ui/dropdown-field';
import { TextAreaField } from '@/app/ui/text-area-field';
import { TextField } from '@/app/ui/text-field';
import {
  IconCamera,
  IconPalette,
  IconRefresh,
  IconX,
} from '@tabler/icons-react';
import { Html5QrcodeResult, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Reducer,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';

enum FormNames {
  Name = 'name',
  Code = 'code',
  CodeFormat = 'codeFormat',
  Note = 'note',
  Color = 'color',
  Icon = 'Icon',
}

type CreateCardForm = {
  [FormNames.Name]: string;
  [FormNames.Code]: string;
  [FormNames.CodeFormat]: number;
  [FormNames.Note]: string;
  [FormNames.Color]: string | null;
  [FormNames.Icon]: string | SvgProps;
};

export default function CreateCardForm() {
  const searchParams = useSearchParams();
  const predefinedCompanyName = searchParams.get('predefinedCompany');
  const predefinedCompany = predefinedCompanies.find(
    c => c.name === predefinedCompanyName
  );
  const { register, handleSubmit, control, watch, setValue } =
    useForm<CreateCardForm>({
      defaultValues: predefinedCompany
        ? {
            [FormNames.Name]: predefinedCompany.name,
            [FormNames.Color]: null,
            [FormNames.Icon]: predefinedCompany.svg,
            [FormNames.CodeFormat]: predefinedCompany.codeFormat,
          }
        : {
            [FormNames.CodeFormat]: Html5QrcodeSupportedFormats.EAN_13,
          },
    });
  const [, appDispatch] = useAppState();
  const [{ activeDevice }, dispatch] = useReducer<
    Reducer<ScannerState, ScannerActions>
  >(scannerReducer, initialState);
  const router = useRouter();
  const cameraModalRef = useRef<HTMLDialogElement>(null);
  const [isScannerVisible, setIsScannerVisible] = useState(false);
  const handleCodeDetected = useCallback(
    (text: string, { result }: Html5QrcodeResult) => {
      setValue(FormNames.Code, text);
      if (result.format?.format) {
        setValue(FormNames.CodeFormat, result.format.format);
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
            setIsScannerVisible(cameraModal.open);
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

  return (
    <>
      <form
        className="px-4 py-6 w-full h-full"
        onSubmit={handleSubmit(data => {
          console.log('data', data);
          appDispatch({
            type: 'ADD_CARD',
            payload: {
              name: data[FormNames.Name],
              code: data[FormNames.Code],
              note: data[FormNames.Note] || undefined,
              bgColor: data[FormNames.Color] || null,
              icon: (data[FormNames.Icon] as CardIcon) || null,
              codeFormat: data[
                FormNames.CodeFormat
              ] as Html5QrcodeSupportedFormats,
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
            disabled
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
          name={FormNames.Name}
          register={register}
        />
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
            <div className="bg-background">
              <input type="hidden" {...register(FormNames.Icon)} />
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
      <dialog id="camera-modal" className="modal" ref={cameraModalRef}>
        <div className="modal-box w-full h-full max-h-full max-w-full overflow-clip lg:w-11/12 lg:h-5/6 lg:max-w-5xl lg:max-h-5xl">
          <div className="grid justify-between items-center pb-4 grid-cols-[auto_1fr_auto] gap-4">
            <button
              className="btn btn-sm btn-circle btn-ghost"
              onClick={() => cameraModalRef.current?.close()}
            >
              <IconX className="w-6 h-6" />
            </button>
            <h3 className="font-bold text-lg">Scan your code!</h3>
            <button
              className="btn btn-sm btn-circle btn-ghost"
              onClick={() => {
                dispatch({
                  type: ScannerActionTypes.TOGGLE_ACTIVE_DEVICE,
                });
              }}
            >
              <IconRefresh className="w-6 h-6" />
            </button>
          </div>
          {isScannerVisible && (
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
