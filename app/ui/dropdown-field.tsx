import clsx from 'clsx';

export type Option<T> = {
  label: string | React.ReactNode;
  value: T;
};

export function DropdownField<T = string>({
  label,
  className,
  options,
  value,
}: {
  label: string;
  className?: string;
  options: Option<T>[];
  value?: T;
}) {
  const currentOption = options.find(option => option.value === value);

  return (
    <label className={clsx('form-control w-full', className)}>
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <div className="dropdown dropdown-end">
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
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-full p-2 shadow"
        >
          {options.map(option => (
            <li key={String(option.value)}>{option.label}</li>
          ))}
        </ul>
      </div>
    </label>
  );
}
