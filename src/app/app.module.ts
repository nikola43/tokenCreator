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

@NgModule({
  declarations: [
    AppComponent,
    TwoDigitDecimaNumberDirective,
    TokenGeneratorComponent
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
