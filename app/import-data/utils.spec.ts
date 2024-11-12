import { parseCards, ParseCardsErrors } from '@/app/import-data/utils';
import { describe, expect, it } from '@jest/globals';

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
