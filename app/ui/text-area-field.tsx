import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

export function TextAreaField<T extends FieldValues>({
  label,
  placeholder = `Your ${label.toLowerCase()}`,
  name,
  register,
}: {
  label: string;
  placeholder?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
}) {
  return (
    <label className="form-control">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <textarea
        className="textarea textarea-bordered h-24"
        placeholder={placeholder}
        {...register(name)}
      ></textarea>
    </label>
  );
}
