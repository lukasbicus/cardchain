'use client';

import { noop } from 'lodash';
import {
  createContext,
  Dispatch,
  Reducer,
  useContext,
  useEffect,
  useReducer,
} from 'react';

import {
  AppActions,
  appReducer,
  AppState,
  initialState,
} from '@/app/ui/app-state/reducer';

const AppStateContext = createContext<[AppState, Dispatch<AppActions>]>([
  initialState,
  noop,
]);

export const useAppState = () => useContext(AppStateContext);

const APP_STATE = 'app-state';

function getDefaultAppState(): AppState {
  if (typeof window === 'object') {
    const stateString = localStorage.getItem(APP_STATE);
    if (stateString) {
      try {
        return JSON.parse(stateString);
      } catch {
        return initialState;
      }
    }
  }
  return initialState;
}

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const reducerTuple = useReducer<Reducer<AppState, AppActions>>(
    appReducer,
    getDefaultAppState()
  );
  const state = reducerTuple[0];
  useEffect(() => {
    localStorage.setItem(APP_STATE, JSON.stringify(state));
  }, [state]);
  return (
    <AppStateContext.Provider value={reducerTuple}>
      {children}
    </AppStateContext.Provider>
  );
}
