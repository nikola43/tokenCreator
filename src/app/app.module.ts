import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularMaterialModule} from './angular-material.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {TwoDigitDecimaNumberDirective} from './two-digit-decima-number.directive';
import {AngularEmojisModule} from 'angular-emojis';
import {TokenGeneratorComponent} from './components/token-generator/token-generator.component';
import {BurnDialogComponent} from './components/burn-dialog/burn-dialog.component';
import {CreateTokenDialogComponent} from './components/create-token-dialog/create-token-dialog.component';
import {NoWalletDialogComponent} from './components/no-wallet-dialog/no-wallet-dialog.component';
import {CreateTokenComponent} from './components/create-token/create-token.component';
import {AddLiquidityComponent} from './components/add-liquidity/add-liquidity.component';
import {LockLiquidityComponent} from './components/lock-liquidity/lock-liquidity.component';
import {WhitelistBlacklistComponent} from './components/whitelist-blacklist/whitelist-blacklist.component';
import {BurnTokensComponent} from './components/burn-tokens/burn-tokens.component';
import { RemoveLiquidityDialogComponent } from './components/remove-liquidity-dialog/remove-liquidity-dialog.component';
import {FromWeiPipe} from '../utils/FromWei.pipe';
import { CountdownTimerModule } from './../../projects/countdown-timer/src/lib/countdown-timer.module';
import {NetworkSelectorComponent} from "./components/network-selector/network-selector.component";
import {ServiceTokenPaymentSelectorComponent} from "./components/service-token-payment-selector/service-token-payment-selector.component";
import { MatDatetimepickerModule, MatNativeDatetimeModule } from '@mat-datetimepicker/core';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    TwoDigitDecimaNumberDirective,
    TokenGeneratorComponent,
    BurnDialogComponent,
    RemoveLiquidityDialogComponent,
    CreateTokenDialogComponent,
    NoWalletDialogComponent,
    CreateTokenComponent,
    AddLiquidityComponent,
    LockLiquidityComponent,
    WhitelistBlacklistComponent,
    BurnTokensComponent,
    NetworkSelectorComponent,
    FromWeiPipe,
    ServiceTokenPaymentSelectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FormsModule,
    AngularEmojisModule,
    CountdownTimerModule,
    MatNativeDatetimeModule,
    MatDatetimepickerModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
