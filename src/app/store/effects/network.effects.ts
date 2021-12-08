
import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {ENetworkActions, GetNetwork, GetNetworkSuccess} from '../actions/network.actions';
import {INetwork} from '../../../../models/network.interface';
import { IAppState } from '../state/app.state';
import { Web3Service } from '../../services/web3.service';

@Injectable()
export class NetworkEffects {
  @Effect()
  getConfig$ = this._actions$.pipe(
    ofType<GetNetwork>(ENetworkActions.GetNetwork),
    switchMap(async () => this._web3Service.getNetworkId()),
    switchMap((network: INetwork) => {
      return of(new GetNetworkSuccess(network));
    })
  );

  constructor(
    // tslint:disable-next-line:variable-name
    private _web3Service: Web3Service,
    // tslint:disable-next-line:variable-name
    private _actions$: Actions,
    private _store: Store<IAppState>) {}
}
