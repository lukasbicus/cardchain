import clsx from 'clsx';

export type Option<T> = {
  label: string | React.ReactNode;
  value: T;
};

export function DropdownField<T = string>({
  label,
  className,
  dropdownClassName,
  options,
  value,
}: {
  label: string;
  className?: string;
  dropdownClassName?: string;
  options: Option<T>[];
  value?: T;
}) {
  const currentOption = options.find(option => option.value === value);

  return (
    <label className={clsx('form-control w-full', className)}>
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <div className={clsx('dropdown dropdown-end', dropdownClassName)}>
        <div className="input input-bordered w-full flex items-center">
          {currentOption ? (
            <div tabIndex={0} role="button" className="w-full">
              {currentOption.label}
            </div>
          ) : (
            <input tabIndex={0} type="text" role="button" className="w-full" />
          )}
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-full p-2 shadow max-h-96 overflow-auto"
        >
          {options.map(option => (
            <li key={String(option.value)}>{option.label}</li>
          ))}
        </ul>
      </div>
    </label>
  );
}
