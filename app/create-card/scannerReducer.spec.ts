import { describe, expect, it } from '@jest/globals';
import {
  ScannerActionTypes,
  scannerReducer,
  ScannerState,
  SetDevicesAction,
  ToggleActiveDeviceAction,
} from './scannerReducer';

describe('scannerReducer', () => {
  const initialState: ScannerState = {
    devices: [],
    activeDevice: null,
  };

  it('should handle SET_DEVICES action', () => {
    const devices = [
      { id: '1', label: 'Camera 1' },
      { id: '2', label: 'Camera 2' },
    ];
    const action: SetDevicesAction = {
      type: ScannerActionTypes.SET_DEVICES,
      payload: devices,
    };
    const state = scannerReducer(initialState, action);
    expect(state.devices).toEqual(devices);
    expect(state.activeDevice).toEqual(devices[0]);
  });

  it('should handle TOGGLE_ACTIVE_DEVICE action', () => {
    const devices = [
      { id: '1', label: 'Camera 1' },
      { id: '2', label: 'Camera 2' },
    ];
    const stateWithDevices: ScannerState = {
      ...initialState,
      devices: devices,
      activeDevice: devices[0],
    };
    const action: ToggleActiveDeviceAction = {
      type: ScannerActionTypes.TOGGLE_ACTIVE_DEVICE,
    };
    const stateAfterToggle = scannerReducer(stateWithDevices, action);
    expect(stateAfterToggle.activeDevice).toEqual(devices[1]);

    // Toggle again to loop back to the first device
    const stateAfterSecondToggle = scannerReducer(stateAfterToggle, action);
    expect(stateAfterSecondToggle.activeDevice).toEqual(devices[0]);
  });

  it('should handle TOGGLE_ACTIVE_DEVICE action for initial state', () => {
    const action: ToggleActiveDeviceAction = {
      type: ScannerActionTypes.TOGGLE_ACTIVE_DEVICE,
    };
    const stateAfterToggle = scannerReducer(initialState, action);
    expect(stateAfterToggle.activeDevice).toEqual(null);
  });

  it('should return the initial state for an unknown action type', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };

    // @ts-expect-error: Testing for unknown action type
    const state = scannerReducer(initialState, unknownAction);
    expect(state).toEqual(initialState);
  });
});
