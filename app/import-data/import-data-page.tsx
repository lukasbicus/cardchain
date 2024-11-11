'use client';

import { useForm } from 'react-hook-form';

enum ImportFormNames {
  FileList = 'fileList',
}

type ImportForm = {
  [ImportFormNames.FileList]: FileList;
};

export function ImportDataPage() {
  const { register, handleSubmit } = useForm<ImportForm>();
  const processFileImport = (data: ImportForm) => {
    console.log('importFile', data);
    const file = data[ImportFormNames.FileList]
      ? data[ImportFormNames.FileList][0]
      : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        const text = e.target?.result;
        if (typeof text === 'string') {
          console.log('fileContent: ', text as string);
        }
        // Process the file content as needed
      };
      reader.readAsText(file); // Read the file as text
    }
  };
  return (
    <form
      className="px-4 py-6 w-full h-full"
      onSubmit={handleSubmit(processFileImport)}
    >
      <div className="px-4 py-6 bg-base-300">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Pick a file to be imported</span>
          </div>
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
            {...register(ImportFormNames.FileList)}
          />
        </label>
      </div>
      <footer className="btm-nav btm-nav-md text-base-content px-4">
        <button className="btn btn-primary w-full" type="submit">
          Import data
        </button>
      </footer>
    </form>
  );
}
