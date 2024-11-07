import { deburr } from 'lodash';

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
