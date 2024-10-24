import clsx from 'clsx';

export type Option<T> = {
  label: string;
  value: T;
};

export function DropdownField<T = string>({
  label,
  className,
  options,
}: {
  label: string;
  className?: string;
  options: Option<T>[];
  value?: T;
}) {
  return (
    <label className={clsx('form-control w-full', className)}>
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <div className="dropdown dropdown-end">
        {/*<div tabIndex={0} role="button" className="btn m-1">*/}
        {/*  Click*/}
        {/*</div>*/}
        <input
          tabIndex={0}
          type="text"
          role="button"
          className="input input-bordered w-full"
        />
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
