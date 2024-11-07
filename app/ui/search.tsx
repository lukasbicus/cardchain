'use client';

import { IconSearch, IconX } from '@tabler/icons-react';
import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export function Search({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const setQuerySearchParam = (query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('query', query);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSearchChange = useDebouncedCallback(function ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) {
    setQuerySearchParam(value);
  }, 300);
  const query = searchParams.get('query')?.toString();
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className={clsx('form-control', className)}>
      <label className="input input-bordered flex items-center gap-2 w-full">
        <IconSearch className="h-4 w-4 opacity-70" />
        <input
          ref={inputRef}
          type="text"
          className="grow w-full"
          placeholder="Search"
          defaultValue={query}
          onChange={handleSearchChange}
        />
        <button
          className={clsx('btn btn-circle btn-sm', {
            ['invisible']: !query,
          })}
        >
          <IconX
            stroke={2}
            className="h-4 w-4"
            onClick={() => {
              if (inputRef.current) {
                inputRef.current.value = '';
              }
              setQuerySearchParam('');
            }}
          />
        </button>
      </label>
    </div>
  );
}
