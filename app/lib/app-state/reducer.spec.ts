import {
  AddCardAction,
  appReducer,
  Card,
  DeleteCardAction,
  EditCardAction,
} from '@/app/lib/app-state/reducer';
import { CardIcon, CodeType } from '@/app/lib/shared';
import { describe, expect, it } from '@jest/globals';
import { v4 as uuid } from 'uuid';

const dummyCard: Card = {
  id: uuid(),
  name: 'Lidl',
  code: '123adfa657SFV',
  bgColor: '#4523C9',
  icon: CardIcon.Retail,
  codeType: CodeType.QrCode,
};

describe('appReducer', () => {
  // Test for adding a card
  it('should handle ADD_CARD', () => {
    const initialState = { cards: [] };
    const newCard: Omit<Card, 'id'> = {
      bgColor: '#4523C9',
      icon: CardIcon.Retail,
      codeType: CodeType.QrCode,
      name: 'Test Card',
      code: 'ABC123',
    };
    const addAction: AddCardAction = { type: 'ADD_CARD', payload: newCard };

    const state = appReducer(initialState, addAction);
    expect(state.cards).toHaveLength(1);
    expect(state.cards[0]).toMatchObject(newCard);
  });

  // Test for editing a card
  it('should handle EDIT_CARD', () => {
    const initialState = {
      cards: [
        { ...dummyCard, name: 'Initial Card', id: 'card1', code: 'ABC123' },
      ],
    };
    const updatedCard = { ...initialState.cards[0], name: 'Updated Card' };
    const editAction: EditCardAction = {
      type: 'EDIT_CARD',
      payload: { id: 'card1', updatedCard },
    };

    const state = appReducer(initialState, editAction);
    expect(state.cards).toHaveLength(1);
    expect(state.cards[0]).toEqual({
      ...initialState.cards[0],
      ...updatedCard,
    });
  });

  // Test for deleting a card
  it('should handle DELETE_CARD', () => {
    const initialState = {
      cards: [
        { ...dummyCard, name: 'Card to Delete', id: 'card1', code: 'ABC123' },
      ],
    };
    const deleteAction: DeleteCardAction = {
      type: 'DELETE_CARD',
      payload: { id: 'card1' },
    };

    const state = appReducer(initialState, deleteAction);
    expect(state.cards).toHaveLength(0);
  });

  // Test for default case
  it('should return the initial state for an unknown action type', () => {
    const initialState = { cards: [] };
    const unknownAction = { type: 'UNKNOWN_ACTION' };

    // @ts-expect-error: Testing for unknown action type
    const state = appReducer(initialState, unknownAction);
    expect(state).toEqual(initialState);
  });
});
