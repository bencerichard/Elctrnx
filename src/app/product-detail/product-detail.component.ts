import {Component, OnInit} from '@angular/core';
import {ProductService} from "../Product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../models/Product";
import {AuthenticationService} from "../Authentication.service";
import {Observable} from "rxjs";
import {Cart, User} from "../models/User";
import {UserService} from "../User.service";
import {NotifierService} from "angular-notifier";
import {Location} from "@angular/common";
import {Stock} from "../models/Stock";
import {StockService} from "../stock.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product;
  clientName: string;
  user: Observable<User> = this.userService.getUserByUsername(localStorage.getItem('username'));
  private readonly notifier: NotifierService;
  cart: Cart[] = [];
  listOfProducts: Product[] = [];
  isAdmin = false;
  showModal = false;
  stocks: Stock[] = [];
  isAvb = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private location: Location,
    private stockService: StockService,
    private notifierService: NotifierService) {
    this.notifier = notifierService
  }


  getProduct(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getSingleProduct(localStorage.getItem('username'), id)
      .subscribe(product => {
          this.product = product;
          // @ts-ignore
          this.product.price = product.price.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&.');
          // @ts-ignore
          this.product.price = this.product.price.toString().substring(0, this.product.price.toString().length - 2);
        }
      );
  }

  deleteProduct(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.deleteProduct(id).subscribe(() => {
      this.location.back();
    });
  }


  ngOnInit(): void {
    this.getProduct();
    this.prepareClientName();
    this.getUserCart(localStorage.getItem('username'));
    this.getStocks();
  }

  logout(): void {
    this.authenticationService.logout();
  }

  favorites(): void {
    this.router.navigate(['/listing-products-favorites']);
  }

  prepareClientName() {
    this.user.subscribe(user => {
      this.clientName = user.firstName.charAt(0).toUpperCase().concat(user.lastName.charAt(0).toUpperCase());
      if (user.role.roleName.toLowerCase() === 'admin')
        this.isAdmin = true;
    });
  }

  isFavorite(product: Product): boolean {
    return product.isFavorite;
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

  modalFunction() {
    this.showModal = !this.showModal;
  }

  addToCart() : void{

    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUserByUsername(localStorage.getItem('username')).subscribe(user => {
      this.cart = user.cart;
      let ok = 0;
      this.cart.find(elem => {
        if (elem.productId === id) {
          elem.quantity++;
          ok = 1;
        }
      });
       if (!ok && this.cart != null) {
        this.cart.push({productId: id, quantity: 1});
      }
      this.productService.postCart(localStorage.getItem('username'), this.cart).subscribe(() => this.location.back());
    });
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

  getNumberOfItemsInCart() {
    return this.listOfProducts.length;
  }

  isProductAvailable(): boolean {
    const id = +this.route.snapshot.paramMap.get('id');
    this.stocks.forEach(stock => {
      if (stock.productID === id && stock.quantity > 0) {
        this.isAvb = true;
      }
    });
    return this.isAvb;
  }

  getStocks(): void {
    this.stockService.getStocks().subscribe(stock => this.stocks = stock);
  }

}
