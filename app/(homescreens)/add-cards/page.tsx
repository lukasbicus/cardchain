import { Routes } from '@/app/lib/shared';
import {
  IconDotsVertical,
  IconLayoutGrid,
  IconPlus,
  IconSearch,
} from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

function PrimaryHeader({
  title,
  actions,
  children,
}: {
  title: string;
  actions: JSX.Element;
  children: ReactNode;
}) {
  return (
    <header>
      <div>
        {title}
        <div>{actions}</div>
      </div>
      <div>{children}</div>
    </header>
  );
}

export default function Page() {
  return (
    <div>
      <PrimaryHeader
        title="Add cards"
        actions={
          <>
            <button>Add card</button>
          </>
        }
      >
        <div>Search + grid button</div>
      </PrimaryHeader>
      <div>start</div>
      <div className="navbar bg-base-100 text-base-content">
        <div className="navbar-start">
          <Image
            src="/logo.svg"
            alt="Tilda logo"
            className="w-8 rounded-lg bg-base-content"
            width={24}
            height={24}
          />
          <h1 className="btn btn-ghost text-lg">Add cards</h1>
        </div>

        <div className="navbar-end">
          <Link href={Routes.ScanCard}>
            <button className="btn btn-primary">
              <IconPlus className="w-6 h-6" />
              Add card
            </button>
          </Link>
        </div>
      </div>
      <div className="navbar bg-base-100 text-base-content gap-2">
        <div className="form-control flex-1">
          <label className="input input-bordered flex items-center gap-2 w-full">
            <input type="text" className="grow w-full" placeholder="Search" />
            <IconSearch className="h-4 w-4 opacity-70"></IconSearch>
          </label>
        </div>
        <button className="btn btn-circle btn-ghost">
          <IconLayoutGrid className="w-6 h-6" />
        </button>
      </div>
      <main>
        Add cards
        <div className="flex-2"></div>
      </main>
    </div>
  );
}
