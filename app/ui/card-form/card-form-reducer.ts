import { CameraDevice } from 'html5-qrcode';

export type CardFormState = {
  devices: CameraDevice[];
  activeDevice: CameraDevice | null;
  isModalVisible: boolean;
};

export enum CardFormActionTypes {
  SET_DEVICES = 'SET_DEVICES',
  TOGGLE_ACTIVE_DEVICE = 'TOGGLE_ACTIVE_DEVICE',
  UPDATE_MODAL_VISIBILITY = 'UPDATE_MODAL_VISIBILITY',
}

export type SetDevicesAction = {
  type: CardFormActionTypes.SET_DEVICES;
  payload: CameraDevice[];
};

export type ToggleActiveDeviceAction = {
  type: CardFormActionTypes.TOGGLE_ACTIVE_DEVICE;
};
export type UpdateModalVisibilityAction = {
  type: CardFormActionTypes.UPDATE_MODAL_VISIBILITY;
  payload: boolean;
};

export type CardFormActions =
  | SetDevicesAction
  | ToggleActiveDeviceAction
  | UpdateModalVisibilityAction;

export const initialState: CardFormState = {
  activeDevice: null,
  devices: [],
  isModalVisible: false,
};

export const cardFormReducer = (
  state: CardFormState,
  action: CardFormActions
): CardFormState => {
  switch (action.type) {
    case CardFormActionTypes.SET_DEVICES:
      return {
        ...state,
        devices: action.payload,
        activeDevice: action.payload[0] ?? null,
      };
    case CardFormActionTypes.TOGGLE_ACTIVE_DEVICE:
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
    case CardFormActionTypes.UPDATE_MODAL_VISIBILITY:
      return {
        ...state,
        isModalVisible: action.payload,
      };
    default:
      return state;
  }
};
