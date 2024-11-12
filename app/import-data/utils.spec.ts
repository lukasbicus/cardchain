import {
  getUniqParsedCards,
  parseCards,
  ParseCardsErrors,
  ParsedCard,
} from '@/app/import-data/utils';
import { Card } from '@/app/lib/app-state/reducer';
import { describe, expect, it } from '@jest/globals';
import { v4 as uuid } from 'uuid';

describe('parseCards', () => {
  it('should throw an error for text, that is not in JSON format', async () => {
    await expect(parseCards('an invalid JSON format')).rejects.toThrowError(
      ParseCardsErrors.TextIsNotValidJSON
    );
  });

  it("should throw an error for a JSON text, that doesn't represent cards", async () => {
    await expect(parseCards('{"a": 5, "b": "tilda"}')).rejects.toThrowError(
      ParseCardsErrors.TextDoesNotContainCards
    );
  });

  it('should resolve with an card object', async () => {
    const cards = [
      {
        name: 'Kniznica',
        code: '9002113949',
        bgColor: '#778899',
        icon: 'Books',
        codeFormat: 'CODE39',
      },
    ];
    await expect(parseCards(JSON.stringify(cards))).resolves.toEqual(cards);
  });
});

describe('getUniqParsedCards', () => {
  const cards: Card[] = [
    {
      name: 'DM',
      id: uuid(),
      code: '123',
      note: 'Pin: 4567',
      bgColor: null,
      icon: null,
      favorite: false,
      codeFormat: 'CODE39',
    },
  ];
  const parsedCardA: ParsedCard = {
    name: 'My DM card',
    code: cards[0].code,
    bgColor: null,
    icon: null,
    codeFormat: cards[0].codeFormat,
  };
  const parsedCardB: ParsedCard = {
    name: 'Adam',
    code: '123q2354',
    bgColor: null,
    icon: null,
    codeFormat: 'CODE39',
  };

  it('should return all parsedCards for empty cards', () => {
    expect(getUniqParsedCards([parsedCardA, parsedCardB], [])).toEqual([
      parsedCardA,
      parsedCardB,
    ]);
  });

  it('should return parsedCards without equivalents from cards', () => {
    expect(getUniqParsedCards([parsedCardA, parsedCardB], cards)).toEqual([
      parsedCardB,
    ]);
  });
});
