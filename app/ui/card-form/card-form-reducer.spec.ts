import { describe, expect, it } from '@jest/globals';
import {
  CardFormActionTypes,
  cardFormReducer,
  CardFormState,
  SetDevicesAction,
  ToggleActiveDeviceAction,
  UpdateModalVisibilityAction,
} from './card-form-reducer';

describe('cardFormReducer', () => {
  const initialState: CardFormState = {
    devices: [],
    activeDevice: null,
    isModalVisible: false,
  };

  it('should handle SET_DEVICES action', () => {
    const devices = [
      { id: '1', label: 'Camera 1' },
      { id: '2', label: 'Camera 2' },
    ];
    const action: SetDevicesAction = {
      type: CardFormActionTypes.SET_DEVICES,
      payload: devices,
    };
    const state = cardFormReducer(initialState, action);
    expect(state.devices).toEqual(devices);
    expect(state.activeDevice).toEqual(devices[0]);
  });

  it('should handle TOGGLE_ACTIVE_DEVICE action', () => {
    const devices = [
      { id: '1', label: 'Camera 1' },
      { id: '2', label: 'Camera 2' },
    ];
    const stateWithDevices: CardFormState = {
      ...initialState,
      devices: devices,
      activeDevice: devices[0],
    };
    const action: ToggleActiveDeviceAction = {
      type: CardFormActionTypes.TOGGLE_ACTIVE_DEVICE,
    };
    const stateAfterToggle = cardFormReducer(stateWithDevices, action);
    expect(stateAfterToggle.activeDevice).toEqual(devices[1]);

    // Toggle again to loop back to the first device
    const stateAfterSecondToggle = cardFormReducer(stateAfterToggle, action);
    expect(stateAfterSecondToggle.activeDevice).toEqual(devices[0]);
  });

  it('should handle TOGGLE_ACTIVE_DEVICE action for initial state', () => {
    const action: ToggleActiveDeviceAction = {
      type: CardFormActionTypes.TOGGLE_ACTIVE_DEVICE,
    };
    const stateAfterToggle = cardFormReducer(initialState, action);
    expect(stateAfterToggle.activeDevice).toEqual(null);
  });

  it('should handle UPDATE_MODAL_VISIBILITY action for initial state', () => {
    const action: UpdateModalVisibilityAction = {
      type: CardFormActionTypes.UPDATE_MODAL_VISIBILITY,
      payload: true,
    };
    const stateAfterToggle = cardFormReducer(initialState, action);
    expect(stateAfterToggle.isModalVisible).toEqual(true);
  });

  it('should return the initial state for an unknown action type', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };

    // @ts-expect-error: Testing for unknown action type
    const state = cardFormReducer(initialState, unknownAction);
    expect(state).toEqual(initialState);
  });
});
