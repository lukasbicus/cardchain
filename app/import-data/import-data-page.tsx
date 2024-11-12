'use client';

import { FileImportField } from '@/app/ui/file-import-field';
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
  const processFileImport = (data: ImportForm) => {
    console.log('importFile', data);
    const file = data[ImportFormNames.FileList]
      ? data[ImportFormNames.FileList][0]
      : null;
    // file is null throw an error
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        const text = e.target?.result;
        // file content is not string throw an error
        if (typeof text === 'string') {
          console.log('fileContent: ', text as string);
        }
        // Process the file content as needed
      };
      reader.readAsText(file); // Read the file as text

      // try to parse a file
      // throw error in case of failure
      // get current cards from app state
      // compare them based on "code" and "formatCode". Add unique records
      // display count of added records in dialog
      // add options to navigate to my cards and to import more data
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
