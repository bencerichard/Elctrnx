import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LogInComponent} from './log-in/log-in.component';
import {ProductsComponent} from './products/products.component';
import {RegisterComponent} from './register/register.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {MyAccountComponent} from './my-account/my-account.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NotifierModule} from "angular-notifier";


@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    ProductsComponent,
    RegisterComponent,
    PageNotFoundComponent,
    MyAccountComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NotifierModule.withConfig({position: {horizontal: {position: "right"}, vertical: {position: "bottom"}}}),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
