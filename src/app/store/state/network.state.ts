import {INetwork} from '../../../../models/network.interface';

export interface INetworkState {
  network: INetwork;
}

export const initialNetworkState: INetworkState = {
  network: null
};
