import clsx from 'clsx';
import { UseFormRegister, FieldValues, Path, FormState } from 'react-hook-form';

export function TextField<T extends FieldValues>({
  label,
  placeholder = `Your ${label.toLowerCase()}`,
  className,
  name,
  register,
  disabled,
  required,
  errors,
}: {
  label: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FormState<T>['errors'];
  required?: boolean;
}) {
  return (
    <label className={clsx('form-control w-full', className)}>
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        type="text"
        placeholder={placeholder}
        {...register(name, {
          required,
        })}
        disabled={disabled}
        className="input input-bordered w-full"
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
