'use client';

import { getNameFilter } from '@/app/lib/filters';
import { predefinedCompanies } from '@/app/lib/predefined-companies';
import { Routes } from '@/app/lib/shared';
import { sortAlphabetically } from '@/app/lib/sorts';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export function PredefinedCompaniesList() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query')?.toString();

  const companies = query
    ? predefinedCompanies.filter(getNameFilter(query))
    : predefinedCompanies;
  return (
    <ul className="menu menu-lg rounded-box text-base-content">
      {companies
        .sort(({ name: nameA }, { name: nameB }) =>
          sortAlphabetically(nameA, nameB)
        )
        .map(company => (
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
  );
}
