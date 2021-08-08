import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TokenGeneratorComponent} from './components/token-generator/token-generator.component';


const routes: Routes = [
  {path: 'token-generator', component: TokenGeneratorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
