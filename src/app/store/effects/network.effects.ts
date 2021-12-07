
import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {ENetworkActions, GetNetwork, GetNetworkSuccess} from '../actions/network.actions';
import {INetwork} from '../../../../models/network.interface';

@Injectable()
export class NetworkEffects {
  @Effect()
  getConfig$ = this._actions$.pipe(
    ofType<GetNetwork>(ENetworkActions.GetNetwork),
    switchMap(() => this._configService.getConfig()),
    switchMap((network: INetwork) => {
      return of(new GetNetworkSuccess(network));
    })
  );

  constructor(
    // tslint:disable-next-line:variable-name
    private _configService: any,
    // tslint:disable-next-line:variable-name
    private _actions$: Actions) {}
}
