import { deburr } from 'lodash';

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
