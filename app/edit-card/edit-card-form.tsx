'use client';

import Scanner from '@/app/ui/scanner';
import {
  initialState,
  CreateCardFormActions,
  CreateCardFormActionTypes,
  createCardFormReducer,
  CreateCardFormState,
} from '@/app/create-card/createCardFormReducer';
import { useAppState } from '@/app/ui/app-state/app-state-context';
import { mapHtml5QrcodeFormatToJsbarcodeFormat } from '@/app/ui/app-state/codeFormat';
import { AppActionTypes, Card } from '@/app/ui/app-state/reducer';
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
import { useRouter } from 'next/navigation';
import { Reducer, useCallback, useEffect, useReducer, useRef } from 'react';
import { useForm } from 'react-hook-form';

enum EditCardFormNames {
  Name = 'name',
  Code = 'code',
  CodeFormat = 'codeFormat',
  Note = 'note',
  Color = 'color',
  Icon = 'Icon',
}

type EditCardForm = {
  [EditCardFormNames.Name]: string;
  [EditCardFormNames.Code]: string;
  [EditCardFormNames.CodeFormat]: string;
  [EditCardFormNames.Note]: string;
  [EditCardFormNames.Color]: string | null;
  [EditCardFormNames.Icon]: string | SvgProps | null;
};

export function EditCardForm({ originalCard }: { originalCard: Card }) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors: formErrors },
  } = useForm<EditCardForm>({
    defaultValues: {
      [EditCardFormNames.Name]: originalCard.name,
      [EditCardFormNames.Code]: originalCard.code,
      [EditCardFormNames.CodeFormat]: originalCard.codeFormat,
      [EditCardFormNames.Note]: originalCard.note,
      [EditCardFormNames.Color]: originalCard.bgColor,
      [EditCardFormNames.Icon]: originalCard.icon,
    },
  });
  const [, appDispatch] = useAppState();
  const [{ devices, activeDevice, isModalVisible }, dispatch] = useReducer<
    Reducer<CreateCardFormState, CreateCardFormActions>
  >(createCardFormReducer, initialState);
  const router = useRouter();
  const cameraModalRef = useRef<HTMLDialogElement>(null);
  const handleCodeDetected = useCallback(
    (text: string, { result }: Html5QrcodeResult) => {
      setValue(EditCardFormNames.Code, text, {
        shouldValidate: true,
      });
      if (typeof result.format?.format === 'number') {
        setValue(
          EditCardFormNames.CodeFormat,
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

  const code = watch(EditCardFormNames.Code);
  const codeFormat = watch(EditCardFormNames.CodeFormat);
  return (
    <>
      <form
        className="px-4 py-6 w-full h-full"
        onSubmit={handleSubmit(data => {
          appDispatch({
            type: AppActionTypes.EditCard,
            payload: {
              id: originalCard.id,
              updatedCard: {
                id: originalCard.id,
                name: data[EditCardFormNames.Name],
                code: data[EditCardFormNames.Code],
                note: data[EditCardFormNames.Note] || undefined,
                bgColor: data[EditCardFormNames.Color] || null,
                icon: (data[EditCardFormNames.Icon] as CardIcon) || null,
                codeFormat: data[EditCardFormNames.CodeFormat],
              },
            },
          });
          router.replace(`${Routes.Card}?id=${originalCard.id}`);
        })}
      >
        {code && codeFormat && (
          <CodePicture code={code} codeFormat={codeFormat} />
        )}
        <div className="flex gap-4">
          <TextField
            label="Card code"
            name={EditCardFormNames.Code}
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
          name={EditCardFormNames.Name}
          register={register}
          required
          errors={formErrors}
        />
        <TextAreaField
          label="Note"
          name={EditCardFormNames.Note}
          register={register}
        />
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
            name={EditCardFormNames.Color}
            watch={watch}
          />
          <button className="btn btn-primary btn-square mt-9" type="button">
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
          name={EditCardFormNames.Icon}
          watch={watch}
        />
        <div className="h-32" />
        <footer className="btm-nav btm-nav-md text-base-content px-4">
          <button className="btn btn-primary w-full" type="submit">
            Save card
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
