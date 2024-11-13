'use client';

import Scanner from '@/app/ui/scanner';
import {
  initialState,
  CreateCardFormActions,
  CreateCardFormActionTypes,
  createCardFormReducer,
  CreateCardFormState,
} from '@/app/create-card/createCardFormReducer';
import { mapHtml5QrcodeFormatToJsbarcodeFormat } from '@/app/ui/app-state/codeFormat';
import { CardIcon, colorNames, iconsMap, SvgProps } from '@/app/lib/shared';
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
import { Reducer, useCallback, useEffect, useReducer, useRef } from 'react';
import { useForm } from 'react-hook-form';

export enum CardFormNames {
  Name = 'name',
  Code = 'code',
  CodeFormat = 'codeFormat',
  Note = 'note',
  Color = 'color',
  Icon = 'Icon',
}

export type TCardForm = {
  [CardFormNames.Name]: string;
  [CardFormNames.Code]: string;
  [CardFormNames.CodeFormat]: string;
  [CardFormNames.Note]: string;
  [CardFormNames.Color]: string | null;
  [CardFormNames.Icon]: string | SvgProps | null;
};

export function isSvg(
  value: CardIcon | null | SvgProps | string
): value is SvgProps {
  return !(typeof value === 'string' || value === null);
}

export default function CardForm({
  defaultValues,
  submitButtonLabel,
  onSubmit,
  hideColorDropdown,
  openScannerOnInit,
}: {
  defaultValues?: TCardForm;
  submitButtonLabel: string;
  onSubmit: (form: TCardForm) => void;
  hideIconDropdown?: boolean;
  hideColorDropdown?: boolean;
  openScannerOnInit?: boolean;
}) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors: formErrors },
  } = useForm<TCardForm>({
    defaultValues,
  });
  const [{ devices, activeDevice, isModalVisible }, dispatch] = useReducer<
    Reducer<CreateCardFormState, CreateCardFormActions>
  >(createCardFormReducer, initialState);
  const cameraModalRef = useRef<HTMLDialogElement>(null);
  const handleCodeDetected = useCallback(
    (text: string, { result }: Html5QrcodeResult) => {
      setValue(CardFormNames.Code, text, {
        shouldValidate: true,
      });
      if (typeof result.format?.format === 'number') {
        setValue(
          CardFormNames.CodeFormat,
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
    if (openScannerOnInit) {
      cameraModalRef.current?.showModal();
    }
    // eslint-disable-next-line
  }, []);

  const code = watch(CardFormNames.Code);
  const codeFormat = watch(CardFormNames.CodeFormat);
  const defaultValueForIcon = defaultValues
    ? defaultValues[CardFormNames.Icon]
    : null;
  return (
    <>
      <form
        className="px-4 py-6 w-full h-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        {code && codeFormat && (
          <CodePicture code={code} codeFormat={codeFormat} />
        )}
        <div className="flex gap-4">
          <TextField
            label="Card code"
            name={CardFormNames.Code}
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
          name={CardFormNames.Name}
          register={register}
          required
          errors={formErrors}
        />
        <TextAreaField
          label="Note"
          name={CardFormNames.Note}
          register={register}
        />
        {hideColorDropdown ? (
          <input type="hidden" {...register(CardFormNames.Color)} />
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
              name={CardFormNames.Color}
              watch={watch}
            />
            <button className="btn btn-primary btn-square mt-9" type="button">
              <IconPalette className="w-6 h-6" />
            </button>
          </div>
        )}
        {isSvg(defaultValueForIcon) ? (
          <label className={'form-control w-full'}>
            <div className="label">
              <span className="label-text">Company logo</span>
            </div>
            <div className="bg-background">
              <input type="hidden" {...register(CardFormNames.Icon)} />
              <Image
                {...defaultValueForIcon}
                alt="Company icon"
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
            name={CardFormNames.Icon}
            watch={watch}
          />
        )}
        <div className="h-32" />
        <footer className="btm-nav btm-nav-md text-base-content px-4">
          <button className="btn btn-primary w-full" type="submit">
            {submitButtonLabel}
          </button>
        </footer>
      </form>
      <dialog className="modal" ref={cameraModalRef}>
        <div className="modal-box w-full h-full max-h-full max-w-full overflow-clip lg:w-11/12 lg:h-5/6 lg:max-w-5xl lg:max-h-5xl">
          <div className="grid justify-between items-center pb-4 grid-cols-[auto_1fr_auto] gap-4">
            <button
              className="btn btn-square btn-ghost"
              onClick={() => cameraModalRef.current?.close()}
              type="button"
            >
              <IconX className="w-6 h-6" />
            </button>
            <h3 className="font-bold text-lg">Scan your code!</h3>
            {devices.length > 1 ? (
              <button
                className="btn btn-square btn-ghost"
                type="button"
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
