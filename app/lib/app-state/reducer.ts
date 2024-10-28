// Define the Card type
export type Card = {
  name: string;
  id: string;
  code: string;
};

// Define the state type
export type CardState = {
  cards: Card[];
};

// Define action types
export type AddCardAction = {
  type: 'ADD_CARD';
  payload: Card;
};

export type EditCardAction = {
  type: 'EDIT_CARD';
  payload: { id: string; updatedCard: Partial<Card> };
};

export type DeleteCardAction = {
  type: 'DELETE_CARD';
  payload: { id: string };
};

// Union type for card actions
export type CardActions = AddCardAction | EditCardAction | DeleteCardAction;

// Initial state
export const initialState: CardState = {
  cards: [],
};

// Reducer function
export const cardReducer = (
  state: CardState = initialState,
  action: CardActions
): CardState => {
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
