'use client';

import { getUniqParsedCards, parseCards } from '@/app/import-data/utils';
import useAppState from '@/app/lib/app-state/app-state';
import { FileImportField, getFileText } from '@/app/ui/file-import-field';
import clsx from 'clsx';
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
      // display count of added records in dialog
      // add options to navigate to my cards and to import more data
    } catch (e) {
      console.log('error', e, JSON.stringify(e));
    }
  };
  return (
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
  );
}
