'use client';

import { CardsList } from '@/app/(homescreens)/my-cards/cards-list';
import useAppState from '@/app/lib/app-state/app-state';
import { AppActionTypes, AppState, Card } from '@/app/lib/app-state/reducer';
import { favoriteFilter, getNameFilter } from '@/app/lib/filters';
import { PageTemplate } from '@/app/ui/page-template';
import { PrimaryHeader } from '@/app/ui/primary-header';
import { Search } from '@/app/ui/search';
import { IconStarFilled, IconStarHalfFilled } from '@tabler/icons-react';
import { filter, overEvery } from 'lodash';
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

  const visibleCards = getVisibleCards(state, query);

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
      <CardsList cards={visibleCards} dispatch={dispatch} />
    </PageTemplate>
  );
}
