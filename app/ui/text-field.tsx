import clsx from 'clsx';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

export function TextField<T extends FieldValues>({
  label,
  placeholder = `Your ${label.toLowerCase()}`,
  className,
  name,
  register,
  disabled,
}: {
  label: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  name: Path<T>;
  register: UseFormRegister<T>;
}) {
  return (
    <label className={clsx('form-control w-full', className)}>
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        type="text"
        placeholder={placeholder}
        {...register(name)}
        disabled={disabled}
        className="input input-bordered w-full"
      />
    </label>
  );
}
