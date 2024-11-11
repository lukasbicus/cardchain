import clsx from 'clsx';
import { FieldValues, FormState, Path, UseFormRegister } from 'react-hook-form';

export function FileImportField<T extends FieldValues>({
  label,
  className,
  name,
  register,
  disabled,
  required,
  errors,
}: {
  label: string;
  className?: string;
  disabled?: boolean;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FormState<T>['errors'];
  required?: boolean;
}) {
  return (
    <label className={clsx('form-control w-full max-w-xs', className)}>
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        type="file"
        className="file-input file-input-bordered w-full max-w-xs"
        disabled={disabled}
        {...register(name, { required })}
      />
      {errors[name] && (
        <span className="text-sm text-error pt-2 px-1">
          This field is required!
        </span>
      )}
      {!errors[name] && required && (
        <span className="text-sm pt-2 px-1 text-base-content/25">Required</span>
      )}
    </label>
  );
}
