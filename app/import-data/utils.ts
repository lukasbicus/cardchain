import { CardIcon } from '@/app/lib/shared';
import { Card } from '@/app/ui/app-state/reducer';
import { z, ZodError } from 'zod';

const CardIconSchema = z.nativeEnum(CardIcon);

const SvgPropsSchema = z.object({
  src: z.string(),
  width: z.number(),
  height: z.number(),
});

const CardSchema = z.object({
  name: z.string(),
  code: z.string(),
  note: z.string().optional(),
  bgColor: z.string().nullable(),
  icon: z.union([CardIconSchema, SvgPropsSchema]).nullable(),
  codeFormat: z.string(),
});

const CardsArraySchema = z.array(CardSchema);
export type ParsedCard = z.infer<typeof CardSchema>;

export enum ParseCardsErrors {
  TextIsNotValidJSON = 'textIsNotValidJSON',
  TextDoesNotContainCards = 'textDoesNotContainCards',
}

export function parseCards(text: string): Promise<ParsedCard[]> {
  return new Promise((resolve, reject) => {
    try {
      const parsedJSON = JSON.parse(text);
      const cards = CardsArraySchema.parse(parsedJSON);
      resolve(cards);
    } catch (error: unknown) {
      if (error instanceof SyntaxError) {
        reject(new Error(ParseCardsErrors.TextIsNotValidJSON));
      } else if (error instanceof ZodError) {
        reject(new Error(ParseCardsErrors.TextDoesNotContainCards));
      }
      throw error;
    }
  });
}

export function getUniqParsedCards(
  parsedCards: ParsedCard[],
  cards: Card[]
): ParsedCard[] {
  return parsedCards.filter(
    pc => !cards.find(c => c.code === pc.code && c.codeFormat === pc.codeFormat)
  );
}
