import clsx from 'clsx';
import { useRef } from 'react';
import {
  Control,
  Controller,
  FieldValues,
  Path,
  UseFormWatch,
} from 'react-hook-form';
import styles from './dropdown-field.module.css';

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
            <div className={clsx('dropdown', dropdownClassName)} key="dropdown">
              <div className="input input-bordered w-full flex items-center">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost w-full text-right px-0 justify-start"
                >
                  {currentOption ? currentOption.label : ''}
                </div>
              </div>
              <ul
                tabIndex={0}
                ref={dropdownRef}
                className={clsx(
                  'dropdown-content menu bg-base-100 rounded-box z-[1] w-screen p-2 shadow max-h-80 overflow-auto',
                  styles['options-list']
                )}
              >
                {options.map(option => (
                  <li
                    key={String(option.value)}
                    onClick={() => {
                      field.onChange(option.value);
                      dropdownRef.current?.blur();
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
