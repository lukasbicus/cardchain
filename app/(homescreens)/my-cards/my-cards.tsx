'use client';

import useAppState from '@/app/lib/app-state/app-state';
import { AppActionTypes } from '@/app/lib/app-state/reducer';
import { filterByQuery } from '@/app/lib/filters';
import { Routes } from '@/app/lib/shared';
import { CompanyIcon } from '@/app/ui/company-icon';
import { IconStar, IconStarFilled } from '@tabler/icons-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function MyCards() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query')?.toString();
  const [state, dispatch] = useAppState();

  return (
    <ul className="menu menu-sm rounded-box gap-2">
      {filterByQuery(state.cards, query).map(card => (
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
            <button
              className="btn btn-ghost btn-circle btn-primary"
              onClick={e => {
                e.preventDefault();
                dispatch({
                  type: AppActionTypes.ToggleCardFavorite,
                  payload: {
                    id: card.id,
                  },
                });
              }}
            >
              {card.favorite ? (
                <IconStarFilled className="h-6 w-6" />
              ) : (
                <IconStar className="h-6 w-6" />
              )}
            </button>
          </Link>
        </li>
      ))}
    </ul>
  );
}
