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
import {ListingProductsComponent } from './listing-products/listing-products.component';
import {NotifierModule} from "angular-notifier";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatIconModule} from "@angular/material/icon";
import {MatBadgeModule} from '@angular/material/badge';
import {ScrollComponent } from './scroll/scroll.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    ProductsComponent,
    RegisterComponent,
    PageNotFoundComponent,
    MyAccountComponent,
    ListingProductsComponent,
    ScrollComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NotifierModule.withConfig(
      {
        position: {horizontal: {position: "right"}, vertical: {position: "bottom"}},
        behaviour: {
          autoHide: 3000,
          onClick: false,
          onMouseover: "pauseAutoHide",
          showDismissButton: true,
          stacking: 1
        },
      }),
    BrowserAnimationsModule,
    MatSliderModule,
    MatIconModule,
    MatBadgeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
