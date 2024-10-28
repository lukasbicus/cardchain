import {
  AddCardAction,
  Card,
  cardReducer,
  DeleteCardAction,
  EditCardAction,
} from '@/app/lib/app-state/reducer';
import { describe, it, expect } from '@jest/globals';

// Tests for cardReducer
describe('cardReducer', () => {
  // Test for adding a card
  it('should handle ADD_CARD', () => {
    const initialState = { cards: [] };
    const newCard: Card = { name: 'Test Card', id: 'card1', code: 'ABC123' };
    const addAction: AddCardAction = { type: 'ADD_CARD', payload: newCard };

    const state = cardReducer(initialState, addAction);
    expect(state.cards).toHaveLength(1);
    expect(state.cards[0]).toEqual(newCard);
  });

  // Test for editing a card
  it('should handle EDIT_CARD', () => {
    const initialState = {
      cards: [{ name: 'Initial Card', id: 'card1', code: 'ABC123' }],
    };
    const updatedCard = { name: 'Updated Card' };
    const editAction: EditCardAction = {
      type: 'EDIT_CARD',
      payload: { id: 'card1', updatedCard },
    };

    const state = cardReducer(initialState, editAction);
    expect(state.cards).toHaveLength(1);
    expect(state.cards[0]).toEqual({
      ...initialState.cards[0],
      ...updatedCard,
    });
  });

  // Test for deleting a card
  it('should handle DELETE_CARD', () => {
    const initialState = {
      cards: [{ name: 'Card to Delete', id: 'card1', code: 'ABC123' }],
    };
    const deleteAction: DeleteCardAction = {
      type: 'DELETE_CARD',
      payload: { id: 'card1' },
    };

    const state = cardReducer(initialState, deleteAction);
    expect(state.cards).toHaveLength(0);
  });

  // Test for default case
  it('should return the initial state for an unknown action type', () => {
    const initialState = { cards: [] };
    const unknownAction = { type: 'UNKNOWN_ACTION' };

    // @ts-expect-error: Testing for unknown action type
    const state = cardReducer(initialState, unknownAction);
    expect(state).toEqual(initialState);
  });
});
