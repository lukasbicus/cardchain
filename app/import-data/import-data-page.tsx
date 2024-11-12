'use client';

import { getUniqParsedCards, parseCards } from '@/app/import-data/utils';
import useAppState from '@/app/lib/app-state/app-state';
import { Routes } from '@/app/lib/shared';
import { ConfirmDialog } from '@/app/ui/confirm-dialog';
import { FileImportField, getFileText } from '@/app/ui/file-import-field';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

enum ImportFormNames {
  FileList = 'fileList',
}

type ImportForm = {
  [ImportFormNames.FileList]: FileList;
};

export function ImportDataPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ImportForm>();
  const [state, dispatch] = useAppState();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [countOfImportedCards, setCountOfImportedCards] = useState(0);
  const processFileImport = async (data: ImportForm) => {
    try {
      const text = await getFileText(data[ImportFormNames.FileList][0]);
      console.log(text);
      // try to parse a file
      // throw error in case of failure
      const parsedCards = await parseCards(text);
      // get current cards from app state
      // compare them based on "code" and "formatCode". Add unique records
      const uniqParsedCards = getUniqParsedCards(parsedCards, state.cards);
      console.log(uniqParsedCards);
      dispatch({
        type: 'IMPORT_CARDS',
        payload: uniqParsedCards,
      });
      // display count of added records in dialog
      // add options to navigate to my cards and to import more data
      setCountOfImportedCards(uniqParsedCards.length);
      dialogRef.current?.showModal();
    } catch (e) {
      console.log('error', e, JSON.stringify(e));
    }
  };
  const router = useRouter();
  return (
    <>
      <form
        className="px-4 py-6 w-full h-full"
        onSubmit={handleSubmit(processFileImport)}
      >
        <div className="px-4 py-6 bg-base-300">
          <FileImportField
            label="File to be imported"
            name={ImportFormNames.FileList}
            required
            register={register}
            errors={errors}
          />
        </div>
        <footer className="btm-nav btm-nav-md text-base-content px-4">
          <button
            className={clsx('btn btn-primary w-full', {
              disabled: !isValid,
            })}
            type="submit"
            disabled={!isValid}
          >
            Import data
          </button>
        </footer>
      </form>
      <ConfirmDialog
        ref={dialogRef}
        title="Import successful"
        body={`Count of successfully imported cards: ${countOfImportedCards}. Lets check them in my cards section. Click close, if you want to import more cards.`}
        confirmButtonLabel="Go to my cards"
        cancelButtonLabel="Close"
        onConfirmButtonClick={() => {
          router.replace(Routes.MyCards);
        }}
        onCancelButtonClick={() => {
          dialogRef.current?.close();
        }}
      />
    </>
  );
}
