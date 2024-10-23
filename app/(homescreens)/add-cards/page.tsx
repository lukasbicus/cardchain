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
      <div className="navbar bg-base-100 text-primary">
        <div className="navbar-start">
          <Image
            src="/logo.svg"
            alt="Tilda logo"
            className="w-8 bg-white rounded-lg"
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

        {/*<div className="navbar-end">*/}
        {/*  <button className="btn btn-ghost btn-circle">*/}
        {/*    <svg*/}
        {/*      xmlns="http://www.w3.org/2000/svg"*/}
        {/*      className="h-5 w-5"*/}
        {/*      fill="none"*/}
        {/*      viewBox="0 0 24 24"*/}
        {/*      stroke="currentColor"*/}
        {/*    >*/}
        {/*      <path*/}
        {/*        strokeLinecap="round"*/}
        {/*        strokeLinejoin="round"*/}
        {/*        strokeWidth="2"*/}
        {/*        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"*/}
        {/*      />*/}
        {/*    </svg>*/}
        {/*  </button>*/}
        {/*</div>*/}
      </div>
      <div className="navbar bg-base-100 text-primary gap-2">
        <div className="form-control flex-1">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-full"
          />
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
