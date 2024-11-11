'use client';
import useAppState from '@/app/lib/app-state/app-state';
import { TextField } from '@/app/ui/text-field';
import { useForm } from 'react-hook-form';

enum ExportFormNames {
  WithNotes = 'withNotes',
  FileName = 'fileName',
}

type ExportForm = {
  [ExportFormNames.WithNotes]: boolean;
  [ExportFormNames.FileName]: string;
};

const DEFAULT_FILE_NAME = 'my-loyalty-cards';

export function ExportDataPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExportForm>({
    defaultValues: {
      [ExportFormNames.WithNotes]: false,
      [ExportFormNames.FileName]: DEFAULT_FILE_NAME,
    },
  });
  const [state] = useAppState();
  const processExport = ({ fileName }: ExportForm) => {
    console.log(state);

    const jsonString = JSON.stringify(state.cards, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${fileName ? fileName : DEFAULT_FILE_NAME}.json`;
    a.click();

    URL.revokeObjectURL(a.href);
  };
  return (
    <form
      className="px-4 py-6 w-full h-full"
      onSubmit={handleSubmit(processExport)}
    >
      <div className="px-4 py-6 bg-base-300">
        <TextField
          label="File name"
          name={ExportFormNames.FileName}
          register={register}
          placeholder="Name of file with exported data"
          errors={errors}
          className="pb-4"
        />

        <label className="form-control">
          <div className="label">
            <span className="label-text">Export with notes</span>
          </div>
          <input
            type="checkbox"
            className="toggle"
            {...register(ExportFormNames.WithNotes)}
          />
          <span className="text-sm pt-2 px-1 text-base-content/50">
            Notes can include sensitive personal data like passwords
          </span>
        </label>
      </div>
      <footer className="btm-nav btm-nav-md text-base-content px-4">
        <button className="btn btn-primary w-full" type="submit">
          Export data
        </button>
      </footer>
    </form>
  );
}
