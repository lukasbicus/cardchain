import { predefinedCompanies } from '@/app/lib/predefined-companies';
import { Routes } from '@/app/lib/shared';
import PageTemplate from '@/app/ui/page-template';
import { PrimaryHeader } from '@/app/ui/primary-header';
import { Search } from '@/app/ui/search';
import { IconLayoutGrid, IconPlus, IconSearch } from '@tabler/icons-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Page() {
  return (
    <PageTemplate
      header={
        <PrimaryHeader
          title="Add cards"
          actions={
            <Link href={Routes.CreateCard}>
              <button className="btn btn-primary">
                <IconPlus className="w-6 h-6" />
                Add card
              </button>
            </Link>
          }
        >
          <>
            <Search className="flex-1" />
            <button className="btn btn-circle btn-ghost">
              <IconLayoutGrid className="w-6 h-6" />
            </button>
          </>
        </PrimaryHeader>
      }
    >
      <ul className="menu menu-lg rounded-box text-base-content">
        {predefinedCompanies.map(company => (
          <li key={company.name}>
            <Link
              href={{
                pathname: Routes.CreateCard,
                query: { predefinedCompany: company.name },
              }}
              prefetch={false}
            >
              <Image
                {...company.svg}
                alt={company.name}
                className="w-10 h-10"
              />
              <span className="text-xl">{company.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </PageTemplate>
  );
}
