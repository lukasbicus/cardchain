'use client';

import {
  appReducer,
  AppState,
  AppActions,
  initialState,
} from '@/app/lib/app-state/reducer';
import { Dispatch, Reducer, useEffect, useReducer } from 'react';

const APP_STATE = 'app-state';

function getDefaultAppState(): AppState {
  const stateString = localStorage.getItem(APP_STATE);
  if (stateString) {
    try {
      return JSON.parse(stateString);
    } catch {
      return initialState;
    }
  }
  return initialState;
}

export default function useAppState(): [AppState, Dispatch<AppActions>] {
  const [state, dispatch] = useReducer<Reducer<AppState, AppActions>>(
    appReducer,
    getDefaultAppState()
  );
  useEffect(() => {
    localStorage.setItem(APP_STATE, JSON.stringify(state));
  }, [state]);

  return [state, dispatch];
}
