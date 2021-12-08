import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { INetworkState } from '../state/network.state';

const networkState = (state: IAppState) => state.network;

export const selectConfig = createSelector(
  networkState,
  (state: INetworkState) => state.network
);
