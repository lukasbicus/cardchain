import { CameraDevice } from 'html5-qrcode';

export type ScannerState = {
  devices: CameraDevice[];
  activeDevice: CameraDevice | null;
};

export enum ScannerActionTypes {
  SET_DEVICES = 'SET_DEVICES',
  TOGGLE_ACTIVE_DEVICE = 'TOGGLE_ACTIVE_DEVICE',
}

export type SetDevicesAction = {
  type: ScannerActionTypes.SET_DEVICES;
  payload: CameraDevice[];
};

export type ToggleActiveDeviceAction = {
  type: ScannerActionTypes.TOGGLE_ACTIVE_DEVICE;
};

export type ScannerActions = SetDevicesAction | ToggleActiveDeviceAction;

export const initialState: ScannerState = {
  activeDevice: null,
  devices: [],
};

export const scannerReducer = (
  state: ScannerState,
  action: ScannerActions
): ScannerState => {
  console.log(action.type);
  switch (action.type) {
    case ScannerActionTypes.SET_DEVICES:
      return {
        ...state,
        devices: action.payload,
        activeDevice: action.payload[0] ?? null,
      };
    case ScannerActionTypes.TOGGLE_ACTIVE_DEVICE:
      if (state.activeDevice === null || state.devices.length < 2) {
        return state;
      }
      const currentIndex = state.devices.findIndex(
        device => device.id === state.activeDevice!.id
      );
      const nextIndex = (currentIndex + 1) % state.devices.length;
      return {
        ...state,
        activeDevice: state.devices[nextIndex],
      };
    default:
      return state;
  }
};
