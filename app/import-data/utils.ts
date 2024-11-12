import { CardIcon } from '@/app/lib/shared';
import { z, ZodError } from 'zod';

// Define the Zod schema for the CardIcon enum
const CardIconSchema = z.nativeEnum(CardIcon);

// Define the Zod schema for the SvgProps type
const SvgPropsSchema = z.object({
  src: z.string(),
  width: z.number(),
  height: z.number(),
});

// Define the Zod schema for the Card type
const CardSchema = z.object({
  name: z.string(),
  code: z.string(),
  note: z.string().optional(),
  bgColor: z.string().nullable(),
  icon: z.union([CardIconSchema, SvgPropsSchema]).nullable(),
  codeFormat: z.string(),
});

const CardsArraySchema = z.array(CardSchema);
type CardsData = z.infer<typeof CardsArraySchema>;

export enum ParseCardsErrors {
  TextIsNotValidJSON = 'textIsNotValidJSON',
  TextDoesNotContainCards = 'textDoesNotContainCards',
}

export function parseCards(text: string): Promise<CardsData> {
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
