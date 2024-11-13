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
  ToggleCardFavorite = 'toggleCardFavorite',
  ToggleShowFavoritesOnly = 'toggleShowFavoritesOnly',
}

export type AppState = {
  cards: Card[];
  showFavoritesOnly: boolean;
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

export type ToggleCardFavoriteAction = {
  type: AppActionTypes.ToggleCardFavorite;
  payload: { id: string };
};
export type ToggleShowFavoritesOnlyAction = {
  type: AppActionTypes.ToggleShowFavoritesOnly;
};

export type AppActions =
  | AddCardAction
  | EditCardAction
  | DeleteCardAction
  | ImportCardsAction
  | ToggleCardFavoriteAction
  | ToggleShowFavoritesOnlyAction;

export const initialState: AppState = {
  cards: [],
  showFavoritesOnly: false,
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
    case AppActionTypes.ToggleCardFavorite:
      return {
        ...state,
        cards: state.cards.map(card =>
          card.id !== action.payload.id
            ? card
            : { ...card, favorite: !card.favorite }
        ),
      };
    case AppActionTypes.ToggleShowFavoritesOnly:
      return { ...state, showFavoritesOnly: !state.showFavoritesOnly };
    default:
      return state;
  }
};
