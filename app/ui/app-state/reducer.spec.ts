import { CardIcon } from '@/app/lib/shared';
import { mapHtml5QrcodeFormatToJsbarcodeFormat } from '@/app/ui/app-state/codeFormat';
import {
  AddCardAction,
  AppActionTypes,
  appReducer,
  AppState,
  Card,
  DeleteCardAction,
  EditCardAction,
  ImportCardsAction,
  ToggleCardFavoriteAction,
  ToggleShowFavoritesOnlyAction,
} from '@/app/ui/app-state/reducer';
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
  it('should handle AddCardAction', () => {
    const initialState: AppState = { cards: [], showFavoritesOnly: false };
    const newCard: Omit<Card, 'id'> = {
      bgColor: '#4523C9',
      icon: CardIcon.Retail,
      codeFormat: mapHtml5QrcodeFormatToJsbarcodeFormat(
        Html5QrcodeSupportedFormats.QR_CODE
      ),
      name: 'Test Card',
      code: 'ABC123',
    };
    const addAction: AddCardAction = {
      type: AppActionTypes.AddCard,
      payload: newCard,
    };

    const state = appReducer(initialState, addAction);
    expect(state.cards).toHaveLength(1);
    expect(state.cards[0]).toMatchObject(newCard);
  });

  it('should handle EditCardAction', () => {
    const initialState: AppState = {
      cards: [
        { ...dummyCard, name: 'Initial Card', id: 'card1', code: 'ABC123' },
      ],
      showFavoritesOnly: false,
    };
    const updatedCard = { ...initialState.cards[0], name: 'Updated Card' };
    const editAction: EditCardAction = {
      type: AppActionTypes.EditCard,
      payload: { id: 'card1', updatedCard },
    };

    const state = appReducer(initialState, editAction);
    expect(state.cards).toHaveLength(1);
    expect(state.cards[0]).toEqual({
      ...initialState.cards[0],
      ...updatedCard,
    });
  });

  it('should handle DeleteCardAction', () => {
    const initialState: AppState = {
      cards: [
        { ...dummyCard, name: 'Card to Delete', id: 'card1', code: 'ABC123' },
      ],
      showFavoritesOnly: false,
    };
    const deleteAction: DeleteCardAction = {
      type: AppActionTypes.DeleteCard,
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

  it('should handle ImportCardsAction', () => {
    const initialState: AppState = { cards: [], showFavoritesOnly: false };
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
    const importAction: ImportCardsAction = {
      type: AppActionTypes.ImportCards,
      payload: parsedCards,
    };

    const state = appReducer(initialState, importAction);
    expect(state.cards).toHaveLength(2);
    expect(state.cards[0]).toMatchObject(parsedCards[0]);
    expect(state.cards[1]).toMatchObject(parsedCards[1]);
  });

  it('should handle ToggleCardFavoriteAction', () => {
    const initialCard = {
      bgColor: '#4523C9',
      icon: CardIcon.Retail,
      codeFormat: mapHtml5QrcodeFormatToJsbarcodeFormat(
        Html5QrcodeSupportedFormats.QR_CODE
      ),
      id: uuid(),
      name: 'Test Card',
      code: 'ABC123',
    };
    const initialState: AppState = {
      cards: [initialCard],
      showFavoritesOnly: false,
    };

    const toggleCardFavoriteAction: ToggleCardFavoriteAction = {
      type: AppActionTypes.ToggleCardFavorite,
      payload: {
        id: initialState.cards[0].id,
      },
    };

    const state1 = appReducer(initialState, toggleCardFavoriteAction);
    expect(state1.cards[0]).toMatchObject({ ...initialCard, favorite: true });

    const state2 = appReducer(state1, toggleCardFavoriteAction);
    expect(state2.cards[0]).toMatchObject({ ...initialCard, favorite: false });
  });

  it('should handle ToggleShowFavoritesOnlyAction', () => {
    const initialState: AppState = {
      cards: [],
      showFavoritesOnly: false,
    };

    const toggleShowFavoritesOnlyAction: ToggleShowFavoritesOnlyAction = {
      type: AppActionTypes.ToggleShowFavoritesOnly,
    };

    const state1 = appReducer(initialState, toggleShowFavoritesOnlyAction);
    expect(state1).toMatchObject({ ...initialState, showFavoritesOnly: true });

    const state2 = appReducer(state1, toggleShowFavoritesOnlyAction);
    expect(state2).toMatchObject({ ...state1, showFavoritesOnly: false });
  });
});
