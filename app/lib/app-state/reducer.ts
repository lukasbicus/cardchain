// Define the Card type
export type Card = {
  name: string;
  id: string;
  code: string;
};

// Define the state type
export type AppState = {
  cards: Card[];
};

// Define action types
export type AddCardAction = {
  type: 'ADD_CARD';
  payload: Card;
};

export type EditCardAction = {
  type: 'EDIT_CARD';
  payload: { id: string; updatedCard: Card };
};

export type DeleteCardAction = {
  type: 'DELETE_CARD';
  payload: { id: string };
};

export type AppActions = AddCardAction | EditCardAction | DeleteCardAction;

// Initial state
export const initialState: AppState = {
  cards: [],
};

// Reducer function
export const appReducer = (
  state: AppState = initialState,
  action: AppActions
): AppState => {
  switch (action.type) {
    case 'ADD_CARD':
      return {
        ...state,
        cards: [...state.cards, action.payload],
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
    default:
      return state;
  }
};
