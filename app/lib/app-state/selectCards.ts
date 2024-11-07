import { Card } from '@/app/lib/app-state/reducer';
import { deburr } from 'lodash';

export function selectCards(cards: Card[], query?: string) {
  if (!query) {
    return cards;
  }
  const q = deburr(query.toLowerCase());
  return cards.filter(card => deburr(card.name.toLowerCase()).includes(q));
}
