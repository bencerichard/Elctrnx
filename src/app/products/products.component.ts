import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from '../Product';
import {ProductService} from "../Product.service";
import {AuthenticationService} from "../Authentication.service";
import {Cart, User} from "../User";
import {UserService} from "../User.service";
import {Observable} from "rxjs";
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  products2: Product[] = [];
  user: Observable<User> = this.userService.getUserByUsername(localStorage.getItem('username'));
  clientName: string;
  private readonly notifier: NotifierService;
  product: Product;
  listOfProducts: Product[] = [];
  cart: Cart[] = [];


  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private notifierService: NotifierService,
  ) {
    this.notifier = notifierService;
  }

  getUserCart(username: string) {
    this.userService.getUserByUsername(username).subscribe(user => {
        this.cart = user.cart;
        this.cart.forEach(prod => this.productService.getSingleProduct(localStorage.getItem('username'), prod.productId).subscribe(a => {
          this.listOfProducts.push(a);
        }));
      }
    );
  }


  prepareClientName() {
    this.user.subscribe(user => {
      let userArray = user.fullName.split(" ", 2);
      this.clientName = userArray[1].charAt(0).toUpperCase().concat(userArray[0].charAt(0).toUpperCase())
    });
  }

  getProducts(): void {
    this.productService.getProducts(localStorage.getItem('username')).subscribe(
      products => {
        this.products = products;
        this.products2 = products.filter(p => p.id>5);
      }
    );
  }

  addToFavorites(product: Product) {
    this.userService.addToFavorites(localStorage.getItem('username'), product.id).subscribe(() => {
    });
    product.isFavorite = true;
    this.notifier.notify("success", "Product added to favorites");
  }

  deleteFromFavorites(product: Product) {
    this.userService.deleteFromFavorites(product.id, localStorage.getItem('username')).subscribe(() => {
    });
    product.isFavorite = false;
    this.notifier.notify("default", "Product removed from favorites");
  }

  getSingleProduct(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getSingleProduct(localStorage.getItem('username'), id).subscribe(
      product => {
        this.product = product;
      }
    )
  }

  newProduct(categoryName: string, description: string, productName: string, price: number, image: string, producer: string): void {
    this.productService.newProduct({
      categoryName,
      description,
      productName,
      price,
      image,
      producer
    } as Product).subscribe();
  }


  updateProduct(categoryName: string, description: string, productName: string, price: number, image: string, producer: string): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.updateProduct( {
      categoryName,
      description,
      productName,
      price,
      image,
      producer
    } as Product, id).subscribe();
  }

  deleteProduct(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.deleteProduct(id).subscribe();
  }

  ngOnInit(): void {
    this.getProducts();
    this.prepareClientName();
    this.getUserCart(localStorage.getItem('username'));
  }

  my_account(): void {
    this.router.navigate(['/my-account']);
  }

  searchApple(): void {
    this.router.navigate(['/listing-products-apple']);
  }

  searchSamsung(): void {
    this.router.navigate(['/listing-products-samsung']);
  }

  searchSony(): void {
    this.router.navigate(['/listing-products-sony']);
  }

  searchAsus(): void {
    this.router.navigate(['/listing-products-asus']);
  }

  searchDell(): void {
    this.router.navigate(['/listing-products-dell']);
  }

  searchBeats(): void {
    this.router.navigate(['/listing-products-beats']);
  }

  searchBose(): void {
    this.router.navigate(['/listing-products-bose']);
  }

  searchJbl(): void {
    this.router.navigate(['/listing-products-jbl']);
  }

  searchLg(): void {
    this.router.navigate(['/listing-products-lg']);
  }

  smartphones(): void {
    this.router.navigate(['/listing-products-smartphones']);
  }

  headphones(): void {
    this.router.navigate(['/listing-products-headphones']);
  }

  tvs(): void {
    this.router.navigate(['/listing-products-tvs']);
  }

  speakers(): void {
    this.router.navigate(['/listing-products-speakers']);
  }

  smartWatches(): void {
    this.router.navigate(['/listing-products-smartwatches']);
  }

  smartHome(): void {
    this.router.navigate(['/listing-products-smarthome']);
  }

  tablets(): void {
    this.router.navigate(['/listing-products-tablets']);
  }

  laptops(): void {
    this.router.navigate(['/listing-products-laptops']);
  }

  favorites(): void {
    this.router.navigate(['/listing-products-favorites']);
  }

  logout(): void {
    this.authenticationService.logout();
  }

  isFavorite(product: Product): boolean {
    return product.isFavorite;
  }

  getNumberOfItemsInCart() {
    return this.listOfProducts.length;
  }
}
