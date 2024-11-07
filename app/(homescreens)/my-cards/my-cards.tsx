'use client';

import useAppState from '@/app/lib/app-state/app-state';
import { selectCards } from '@/app/lib/app-state/selectCards';
import { Routes } from '@/app/lib/shared';
import { IconStar } from '@tabler/icons-react';
import CompanyIcon from '@/app/ui/company-icon';
import Link from 'next/link';

export default function MyCards({ query }: { query?: string }) {
  const [state] = useAppState();

  return (
    <ul className="menu menu-sm rounded-box gap-2">
      {selectCards(state.cards, query).map(card => (
        <li key={card.id}>
          <Link
            href={{
              pathname: Routes.Card,
              query: { id: card.id },
            }}
            className="grid grid-cols-[auto_1fr_auto] justify-between flex-row gap-2 border items-center"
            style={
              card.bgColor
                ? {
                    backgroundColor: card.bgColor,
                  }
                : undefined
            }
          >
            <span className="w-10 h-10">
              <CompanyIcon {...card} />
            </span>
            <span className="text-xl">{card.name}</span>
            <button className="btn btn-ghost btn-square btn-primary">
              <IconStar className="h-6 w-6" />
            </button>
          </Link>
        </li>
      ))}
    </ul>
  );
}
