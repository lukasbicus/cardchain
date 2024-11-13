'use client';

import useAppState from '@/app/lib/app-state/app-state';
import { AppActionTypes, AppState, Card } from '@/app/lib/app-state/reducer';
import { favoriteFilter, getNameFilter } from '@/app/lib/filters';
import { Routes } from '@/app/lib/shared';
import { CompanyIcon } from '@/app/ui/company-icon';
import { PageTemplate } from '@/app/ui/page-template';
import { PrimaryHeader } from '@/app/ui/primary-header';
import { Search } from '@/app/ui/search';
import {
  IconStar,
  IconStarFilled,
  IconStarHalfFilled,
} from '@tabler/icons-react';
import { filter, overEvery } from 'lodash';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function getVisibleCards(appState: AppState, query: string): Card[] {
  const filterFunctions: ((c: Card) => boolean)[] = [];
  if (query) {
    filterFunctions.push(getNameFilter<Card>(query));
  }
  if (appState.showFavoritesOnly) {
    filterFunctions.push(favoriteFilter<Card>);
  }
  const combinedFilter: (c: Card) => boolean = overEvery(filterFunctions);

  return filter(appState.cards, combinedFilter);
}

export default function MyCardsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query')?.toString() ?? '';
  const [state, dispatch] = useAppState();

  // add showFavoritesOnly to app state
  // implement toggle on showFavoritesOnly
  // if showFavoritesOnly is valid, filter cards by favoriteFilter
  // if query, filter cards by queryFilter

  return (
    <PageTemplate
      header={
        <PrimaryHeader
          title="My cards"
          actions={
            <>
              <button
                className="btn btn-circle btn-ghost btn-primary "
                onClick={() => {
                  dispatch({
                    type: AppActionTypes.ToggleShowFavoritesOnly,
                  });
                }}
              >
                {state.showFavoritesOnly ? (
                  <IconStarFilled className="w-6 h-6" />
                ) : (
                  <IconStarHalfFilled className="w-6 h-6" />
                )}
              </button>
            </>
          }
        >
          <Search className="flex-1" />
        </PrimaryHeader>
      }
    >
      <ul className="menu menu-sm rounded-box gap-2">
        {getVisibleCards(state, query).map(card => (
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
    </PageTemplate>
  );
}
