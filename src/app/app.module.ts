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
import {CreateTokenComponent} from './components/create-token/create-token.component';
import {AddLiquidityComponent} from './components/add-liquidity/add-liquidity.component';
import {LockLiquidityComponent} from './components/lock-liquidity/lock-liquidity.component';
import {WhitelistBlacklistComponent} from './components/whitelist-blacklist/whitelist-blacklist.component';
import {BurnTokensComponent} from './components/burn-tokens/burn-tokens.component';
import { RemoveLiquidityDialogComponent } from './components/remove-liquidity-dialog/remove-liquidity-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    TwoDigitDecimaNumberDirective,
    TokenGeneratorComponent,
    BurnDialogComponent,
    RemoveLiquidityDialogComponent,
    CreateTokenComponent,
    AddLiquidityComponent,
    LockLiquidityComponent,
    WhitelistBlacklistComponent,
    BurnTokensComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
