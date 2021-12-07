import { RouterReducerState } from '@ngrx/router-store';
import {initialNetworkState, INetworkState} from './network.state';

export interface IAppState {
  router?: RouterReducerState;
  network: INetworkState;
}

export const initialAppState: IAppState = {
  network: initialNetworkState
};

export function getInitialState(): IAppState {
  return initialAppState;
}
