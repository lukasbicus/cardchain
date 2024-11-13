import { mapHtml5QrcodeFormatToJsbarcodeFormat } from '@/app/lib/app-state/codeFormat';
import {
  AddCardAction,
  appReducer,
  Card,
  DeleteCardAction,
  EditCardAction,
  ImportCardsAction,
} from '@/app/lib/app-state/reducer';
import { CardIcon } from '@/app/lib/shared';
import { describe, expect, it } from '@jest/globals';
import { Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { v4 as uuid } from 'uuid';

const dummyCard: Card = {
  id: uuid(),
  name: 'Lidl',
  code: '123adfa657SFV',
  bgColor: '#4523C9',
  icon: CardIcon.Retail,
  codeFormat: mapHtml5QrcodeFormatToJsbarcodeFormat(
    Html5QrcodeSupportedFormats.QR_CODE
  ),
};

describe('appReducer', () => {
  it('should handle ADD_CARD', () => {
    const initialState = { cards: [] };
    const newCard: Omit<Card, 'id'> = {
      bgColor: '#4523C9',
      icon: CardIcon.Retail,
      codeFormat: mapHtml5QrcodeFormatToJsbarcodeFormat(
        Html5QrcodeSupportedFormats.QR_CODE
      ),
      name: 'Test Card',
      code: 'ABC123',
    };
    const addAction: AddCardAction = { type: 'ADD_CARD', payload: newCard };

    const state = appReducer(initialState, addAction);
    expect(state.cards).toHaveLength(1);
    expect(state.cards[0]).toMatchObject(newCard);
  });

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

  it('should return the initial state for an unknown action type', () => {
    const initialState = { cards: [] };
    const unknownAction = { type: 'UNKNOWN_ACTION' };

    // @ts-expect-error: Testing for unknown action type
    const state = appReducer(initialState, unknownAction);
    expect(state).toEqual(initialState);
  });

  it('should handle IMPORT_CARDS', () => {
    const initialState = { cards: [] };
    const parsedCards: Omit<Card, 'id' | 'favorite'>[] = [
      {
        bgColor: '#4523C9',
        icon: CardIcon.Retail,
        codeFormat: mapHtml5QrcodeFormatToJsbarcodeFormat(
          Html5QrcodeSupportedFormats.QR_CODE
        ),
        name: 'Test Card',
        code: 'ABC123',
      },
      {
        bgColor: '#00A309',
        icon: CardIcon.Car,
        codeFormat: mapHtml5QrcodeFormatToJsbarcodeFormat(
          Html5QrcodeSupportedFormats.CODABAR
        ),
        name: 'Car service',
        code: 'XS78DB',
      },
    ];
    const addAction: ImportCardsAction = {
      type: 'IMPORT_CARDS',
      payload: parsedCards,
    };

    const state = appReducer(initialState, addAction);
    expect(state.cards).toHaveLength(2);
    expect(state.cards[0]).toMatchObject(parsedCards[0]);
    expect(state.cards[1]).toMatchObject(parsedCards[1]);
  });
});
