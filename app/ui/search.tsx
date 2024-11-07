'use client';

import { IconSearch } from '@tabler/icons-react';
import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export function Search({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearchChange = useDebouncedCallback(function ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  return (
    <div className={clsx('form-control', className)}>
      <label className="input input-bordered flex items-center gap-2 w-full">
        <input
          type="text"
          className="grow w-full"
          placeholder="Search"
          defaultValue={searchParams.get('query')?.toString()}
          onChange={handleSearchChange}
        />
        <IconSearch className="h-4 w-4 opacity-70" />
      </label>
    </div>
  );
}
