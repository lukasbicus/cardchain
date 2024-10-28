import clsx from 'clsx';
import { useRef } from 'react';
import {
  Control,
  Controller,
  FieldValues,
  Path,
  UseFormWatch,
} from 'react-hook-form';

export type Option<U> = {
  label: string | React.ReactNode;
  value: U;
};

export function DropdownField<T extends FieldValues, U = string>({
  label,
  className,
  dropdownClassName,
  options,
  name,
  control,
  watch,
}: {
  label: string;
  className?: string;
  dropdownClassName?: string;
  options: Option<U>[];
  name: Path<T>;
  control: Control<T>;
  watch: UseFormWatch<T>;
}) {
  const currentOptionValue = watch(name);
  const currentOption = options.find(
    option => option.value === currentOptionValue
  );

  const dropdownRef = useRef<HTMLUListElement>(null);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <label className={clsx('form-control w-full', className)}>
            <div className="label">
              <span className="label-text">{label}</span>
            </div>
            <div
              className={clsx('dropdown dropdown-end', dropdownClassName)}
              key="dropdown"
            >
              <div className="input input-bordered w-full flex items-center">
                {currentOption ? (
                  <div tabIndex={0} role="button" className="w-full">
                    {currentOption.label}
                  </div>
                ) : (
                  <input
                    tabIndex={0}
                    type="text"
                    role="button"
                    className="w-full"
                  />
                )}
              </div>
              <ul
                tabIndex={0}
                ref={dropdownRef}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-full p-2 shadow max-h-80 overflow-auto"
              >
                {options.map(option => (
                  <li
                    key={String(option.value)}
                    onClick={() => {
                      field.onChange(option.value);
                      console.log('dropdownRef.current', dropdownRef.current);
                      dropdownRef.current?.blur();
                      // event.
                      // control.
                    }}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            </div>
          </label>
        );
      }}
    />
  );
}
