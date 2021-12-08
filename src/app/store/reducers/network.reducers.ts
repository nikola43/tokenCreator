import { NetworkActions, ENetworkActions } from '../actions/network.actions';
import {INetworkState, initialNetworkState} from '../state/network.state';

export const networkReducers = (
  state = initialNetworkState,
  action: NetworkActions
): INetworkState => {
  switch (action.type) {
    case ENetworkActions.GetNetworkSuccess: {
      return {
        ...state,
        network: action.payload
      };
    }

    default:
      return state;
  }
};
