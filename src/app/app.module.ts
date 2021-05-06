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
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { DeleteAgmMarkerComponent } from './delete-agm-marker/delete-agm-marker.component';
import { DialogComponent } from './dialog/dialog.component';
import { DonationComponent } from './donation/donation.component';
import { DonationSubmitDialogComponent } from './donation-submit-dialog/donation-submit-dialog.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {TestComponent} from './test/test.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import {AgmCoreModule} from '@agm/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {environment} from '../environments/environment.prod';

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
    ProductDetailComponent,
    ShoppingCartComponent,
    ProductEditComponent,
    DeleteAgmMarkerComponent,
    DialogComponent,
    DonationComponent,
    DonationSubmitDialogComponent,
    TestComponent,
  ],
  entryComponents: [
    DialogComponent,
    DonationSubmitDialogComponent,
    DeleteAgmMarkerComponent,
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
    NgbModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatGridListModule,
    MatSnackBarModule,
    AgmCoreModule.forRoot({
      apiKey: environment.GCP_KEY
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
