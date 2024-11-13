import { CardIcon, SvgProps } from '@/app/lib/shared';
import { v4 as uuid } from 'uuid';

export type Card = {
  name: string;
  id: string;
  code: string;
  note?: string;
  bgColor: string | null;
  icon: CardIcon | null | SvgProps;
  favorite?: boolean;
  codeFormat: string;
};

export type AppState = {
  cards: Card[];
};

export type AddCardAction = {
  type: 'ADD_CARD';
  payload: Omit<Card, 'id'>;
};

export type EditCardAction = {
  type: 'EDIT_CARD';
  payload: { id: string; updatedCard: Card };
};

export type DeleteCardAction = {
  type: 'DELETE_CARD';
  payload: { id: string };
};

export type ImportCardsAction = {
  type: 'IMPORT_CARDS';
  payload: Omit<Card, 'id' | 'favorite'>[];
};

export type AppActions =
  | AddCardAction
  | EditCardAction
  | DeleteCardAction
  | ImportCardsAction;

export const initialState: AppState = {
  cards: [],
};

export const appReducer = (
  state: AppState = initialState,
  action: AppActions
): AppState => {
  switch (action.type) {
    case 'ADD_CARD':
      return {
        ...state,
        cards: [...state.cards, { ...action.payload, id: uuid() }],
      };
    case 'EDIT_CARD':
      return {
        ...state,
        cards: state.cards.map(card =>
          card.id === action.payload.id
            ? { ...card, ...action.payload.updatedCard }
            : card
        ),
      };
    case 'DELETE_CARD':
      return {
        ...state,
        cards: state.cards.filter(card => card.id !== action.payload.id),
      };
    case 'IMPORT_CARDS':
      return {
        ...state,
        cards: state.cards.concat(
          action.payload.map(c => ({
            ...c,
            id: uuid(),
          }))
        ),
      };
    default:
      return state;
  }
};
