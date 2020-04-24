import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {LogInComponent} from './log-in/log-in.component';
import {RegisterComponent} from "./register/register.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {MyAccountComponent} from "./my-account/my-account.component";
import {ListingProductsComponent} from "./listing-products/listing-products.component";

const routes: Routes = [
  {path: 'products', component: ProductsComponent},
  {path: 'log-in', component: LogInComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'my-account',component:MyAccountComponent},
  {path: 'listing-products',component:ListingProductsComponent},
  {path: 'listing-products-apple',component:ListingProductsComponent},
  {path: 'listing-products-samsung',component:ListingProductsComponent},
  {path: 'listing-products-sony',component:ListingProductsComponent},
  {path: 'listing-products-asus',component:ListingProductsComponent},
  {path: 'listing-products-dell',component:ListingProductsComponent},
  {path: 'listing-products-beats',component:ListingProductsComponent},
  {path: 'listing-products-bose',component:ListingProductsComponent},
  {path: 'listing-products-jbl',component:ListingProductsComponent},
  {path: 'listing-products-lg',component:ListingProductsComponent},
  {path: 'listing-products-tvs',component:ListingProductsComponent},
  {path: 'listing-products-headphones',component:ListingProductsComponent},
  {path: 'listing-products-speakers',component:ListingProductsComponent},
  {path: 'listing-products-smartwatches',component:ListingProductsComponent},
  {path: 'listing-products-smarthome',component:ListingProductsComponent},
  {path: 'listing-products-tablets',component:ListingProductsComponent},
  {path: 'listing-products-laptops',component:ListingProductsComponent},
  {path: 'listing-products-smartphones',component:ListingProductsComponent},
  {path: '', redirectTo: '/log-in', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
