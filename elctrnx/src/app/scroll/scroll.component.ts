import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from "../Product";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../Product.service";
import {AuthenticationService} from "../Authentication.service";
import {UserService} from "../User.service";
import {Location} from "@angular/common";
import {NotifierService} from "angular-notifier";
import {Observable} from "rxjs";
import {Cart, User} from "../User";

declare const scrollPlay: any;

@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.css']
})
export class ScrollComponent implements OnInit, OnDestroy {

  product: Product;
  user: Observable<User> = this.userService.getUserByUsername(localStorage.getItem('username'));
  private readonly notifier: NotifierService;
  cart: Cart[] = [];
  isAdmin = false;
  listOfProducts: Product[] = [];
  showModal = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private location: Location,
    private notifierService: NotifierService) {
    this.notifier = notifierService
  }

  animateScroll(){
    scrollPlay();
  }

  ngOnInit(): void {
    this.animateScroll();
  }

  ngOnDestroy(): void {
   location.reload();
  }

  addToCart() : void{

    const id = 27;
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

}
