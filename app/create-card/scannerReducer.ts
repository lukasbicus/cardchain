import { CameraDevice } from 'html5-qrcode';

export type ScannerState = {
  devices: CameraDevice[];
  activeDevice: CameraDevice | null;
  isModalVisible: boolean;
};

export enum ScannerActionTypes {
  SET_DEVICES = 'SET_DEVICES',
  TOGGLE_ACTIVE_DEVICE = 'TOGGLE_ACTIVE_DEVICE',
  UPDATE_MODAL_VISIBILITY = 'UPDATE_MODAL_VISIBILITY',
}

export type SetDevicesAction = {
  type: ScannerActionTypes.SET_DEVICES;
  payload: CameraDevice[];
};

export type ToggleActiveDeviceAction = {
  type: ScannerActionTypes.TOGGLE_ACTIVE_DEVICE;
};
export type UpdateModalVisibilityAction = {
  type: ScannerActionTypes.UPDATE_MODAL_VISIBILITY;
  payload: boolean;
};

export type ScannerActions =
  | SetDevicesAction
  | ToggleActiveDeviceAction
  | UpdateModalVisibilityAction;

export const initialState: ScannerState = {
  activeDevice: null,
  devices: [],
  isModalVisible: false,
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
    case ScannerActionTypes.UPDATE_MODAL_VISIBILITY:
      return {
        ...state,
        isModalVisible: action.payload,
      };
    default:
      return state;
  }
};
