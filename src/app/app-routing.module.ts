import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TokenGeneratorComponent} from './components/token-generator/token-generator.component';
import {CreateTokenComponent} from './components/create-token/create-token.component';
import {AddLiquidityComponent} from './components/add-liquidity/add-liquidity.component';
import {LockLiquidityComponent} from './components/lock-liquidity/lock-liquidity.component';
import {BurnTokensComponent} from './components/burn-tokens/burn-tokens.component';
import {WhitelistBlacklistComponent} from './components/whitelist-blacklist/whitelist-blacklist.component';


const routes: Routes = [
  //{path: 'token-generator', component: TokenGeneratorComponent},
  {path: 'create-token', component: CreateTokenComponent},
  {path: 'add-liquidity', component: AddLiquidityComponent},
  {path: 'lock-liquidity', component: LockLiquidityComponent},
  {path: 'burn-token', component: BurnTokensComponent},
  {path: 'whitelist-blacklist', component: WhitelistBlacklistComponent},
  {path: 'presale', component: WhitelistBlacklistComponent},
  {path: '', redirectTo: '/create-token', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
