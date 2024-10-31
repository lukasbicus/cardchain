import { CameraDevice } from 'html5-qrcode';

export type CreateCardFormState = {
  devices: CameraDevice[];
  activeDevice: CameraDevice | null;
  isModalVisible: boolean;
};

export enum CreateCardFormActionTypes {
  SET_DEVICES = 'SET_DEVICES',
  TOGGLE_ACTIVE_DEVICE = 'TOGGLE_ACTIVE_DEVICE',
  UPDATE_MODAL_VISIBILITY = 'UPDATE_MODAL_VISIBILITY',
}

export type SetDevicesAction = {
  type: CreateCardFormActionTypes.SET_DEVICES;
  payload: CameraDevice[];
};

export type ToggleActiveDeviceAction = {
  type: CreateCardFormActionTypes.TOGGLE_ACTIVE_DEVICE;
};
export type UpdateModalVisibilityAction = {
  type: CreateCardFormActionTypes.UPDATE_MODAL_VISIBILITY;
  payload: boolean;
};

export type CreateCardFormActions =
  | SetDevicesAction
  | ToggleActiveDeviceAction
  | UpdateModalVisibilityAction;

export const initialState: CreateCardFormState = {
  activeDevice: null,
  devices: [],
  isModalVisible: false,
};

export const createCardFormReducer = (
  state: CreateCardFormState,
  action: CreateCardFormActions
): CreateCardFormState => {
  switch (action.type) {
    case CreateCardFormActionTypes.SET_DEVICES:
      return {
        ...state,
        devices: action.payload,
        activeDevice: action.payload[0] ?? null,
      };
    case CreateCardFormActionTypes.TOGGLE_ACTIVE_DEVICE:
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
    case CreateCardFormActionTypes.UPDATE_MODAL_VISIBILITY:
      return {
        ...state,
        isModalVisible: action.payload,
      };
    default:
      return state;
  }
};
