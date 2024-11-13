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

export enum AppActionTypes {
  AddCard = 'addCard',
  EditCard = 'editCard',
  DeleteCard = 'deleteCard',
  ImportCards = 'importCards',
}

export type AppState = {
  cards: Card[];
};

export type AddCardAction = {
  type: AppActionTypes.AddCard;
  payload: Omit<Card, 'id'>;
};

export type EditCardAction = {
  type: AppActionTypes.EditCard;
  payload: { id: string; updatedCard: Card };
};

export type DeleteCardAction = {
  type: AppActionTypes.DeleteCard;
  payload: { id: string };
};

export type ImportCardsAction = {
  type: AppActionTypes.ImportCards;
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
    case AppActionTypes.AddCard:
      return {
        ...state,
        cards: [...state.cards, { ...action.payload, id: uuid() }],
      };
    case AppActionTypes.EditCard:
      return {
        ...state,
        cards: state.cards.map(card =>
          card.id === action.payload.id
            ? { ...card, ...action.payload.updatedCard }
            : card
        ),
      };
    case AppActionTypes.DeleteCard:
      return {
        ...state,
        cards: state.cards.filter(card => card.id !== action.payload.id),
      };
    case AppActionTypes.ImportCards:
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
