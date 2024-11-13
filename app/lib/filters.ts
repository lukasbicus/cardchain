import { deburr } from 'lodash';

// todo: delete
export function filterByQuery<T extends { name: string }>(
  cards: T[],
  query?: string
): T[] {
  if (!query) {
    return cards;
  }
  const q = deburr(query.toLowerCase());
  return cards.filter(card => deburr(card.name.toLowerCase()).includes(q));
}

export function getNameFilter<T extends { name: string }>(
  query: string
): (o: T) => boolean {
  const q = deburr(query.toLowerCase());
  return (o: T) => deburr(o.name.toLowerCase()).includes(q);
}

export function favoriteFilter<T extends { favorite?: boolean }>(
  o: T
): boolean {
  return Boolean(o.favorite);
}
