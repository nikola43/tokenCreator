import { Action } from '@ngrx/store';
import {INetwork} from '../../../../models/network.interface';

export enum ENetworkActions {
  GetNetwork = '[Network] Get Network',
  GetNetworkSuccess = '[Network] Get Network Success'
}

export class GetNetwork implements Action {
  public readonly type = ENetworkActions.GetNetwork;
}

export class GetNetworkSuccess implements Action {
  public readonly type = ENetworkActions.GetNetworkSuccess;
  constructor(public payload: INetwork) {}
}

export type NetworkActions =
  | GetNetwork
  | GetNetworkSuccess;

