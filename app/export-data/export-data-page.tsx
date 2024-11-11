'use client';
import useAppState from '@/app/lib/app-state/app-state';
import { useForm } from 'react-hook-form';

enum ExportFormNames {
  WithNotes = 'withNotes',
}

type ExportForm = {
  [ExportFormNames.WithNotes]: boolean;
};

export function ExportDataPage() {
  const { register, handleSubmit } = useForm<ExportForm>({
    defaultValues: {
      [ExportFormNames.WithNotes]: false,
    },
  });
  const [state] = useAppState();
  const processExport = (data: ExportForm) => {
    console.log(data);
    console.log(state);

    const jsonString = JSON.stringify(state, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'tildaAppExport.json';
    a.click();

    URL.revokeObjectURL(a.href);
  };
  return (
    <form
      className="px-4 py-6 w-full h-full"
      onSubmit={handleSubmit(processExport)}
    >
      <div className="px-4 py-6 bg-base-300">
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
