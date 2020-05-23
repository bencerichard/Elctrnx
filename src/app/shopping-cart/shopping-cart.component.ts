import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from "../Authentication.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Cart, DeliveryLocations, OrderInput, User} from "../User";
import {UserService} from "../User.service";
import {NotifierService} from "angular-notifier";
import {Product} from "../Product";
import {ProductService} from "../Product.service";
import {filter} from "rxjs/operators";
import {Location} from "@angular/common";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  user: Observable<User> = this.userService.getUserByUsername(localStorage.getItem('username'));
  clientName: string;
  private readonly notifier: NotifierService;
  showModal = false;
  product: Product;
  listOfProducts: Product[] = [];
  cart: Cart[] = [];
  showList = true;
  userAddress: DeliveryLocations;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private userService: UserService,
    private notifierService: NotifierService,
    private location: Location,
    private productService: ProductService) {
    this.notifier = notifierService;
  }

  getNumberOfItemsInCart(): number{
    return this.listOfProducts.length;
  }



  prepareClientName (){
    this.user.subscribe( user => {
      let userArray = user.fullName.split(" ",2);
      this.clientName = userArray[1].charAt(0).toUpperCase().concat(userArray[0].charAt(0).toUpperCase());
      debugger
      this.userAddress = user.addressDTO;
    } );
  }

  ngOnInit(): void {
    this.prepareClientName();
    this.getUserCart(localStorage.getItem('username'));
    this.emptyCart();
  }

  logout(): void {
    this.authenticationService.logout();
  }

  favorites(): void {
    this.router.navigate(['/listing-products-favorites']);
  }

  orderInput: OrderInput = {
    userId: localStorage.getItem('username'),
    productsList: this.cart,
    deliveryLocation: this.userAddress,
  };

  emptyCart() {
    if (this.listOfProducts.length === 0) {
      this.showList = false;
    }
  }

  createOrder() {
    this.orderInput.productsList = this.cart;
    this.orderInput.deliveryLocation = this.userAddress;
    debugger
    this.productService.postOrder(this.orderInput).subscribe(() => {
      this.location.back()
    });
    this.productService.postCart(localStorage.getItem('username'), this.cart).subscribe();
    this.productService.deleteCartAfterCheckout(localStorage.getItem('username')).subscribe();
    this.modalFunction();
  }



  backToProductsList() {
    this.listOfProducts = [];
    this.cart = [];
    this.router.navigate(['/products']).then();
  }

  getUserCart(username: string) {
    this.userService.getUserByUsername(username).subscribe(user => {
        this.cart = user.cart;
        this.cart.forEach(prod => this.productService.getSingleProduct(localStorage.getItem('username'),prod.productId).subscribe(a => {
          this.listOfProducts.push(a);
          this.showList = true;
        }));
      }
    );
  }

  getQuantity(id: number): number {
    let quantity = null;
    this.cart.find(element => {
      if (element.productId === id) {
        quantity = element.quantity;
      }
    });
    return quantity;
  }

  increaseQuantity(id: number) {
    let quantity = this.getQuantity(id);
    this.cart.find(element => {
      if (element.productId === id) {
        element.quantity = quantity + 1;
      }
    });
    this.productService.postCart(localStorage.getItem('username'), this.cart).subscribe();
  }

  decreaseQuantity(id: number) {
    let quantity = this.getQuantity(id);
    this.cart.find(element => {
      if (element.productId === id && quantity > 1) {
        element.quantity = quantity - 1;
      }
    });
    this.productService.postCart(localStorage.getItem('username'), this.cart).subscribe();
  }

  deleteFromCart(id: number) {
    this.listOfProducts.find(a => {
      if (a !== undefined && a.id === id) {
        this.listOfProducts.splice(this.listOfProducts.indexOf(a), 1);
      }
    });
    this.cart.find(element => {
      if (element !== undefined && element.productId === id) {
        this.cart.splice(this.cart.indexOf(element), 1);
      }
    });
    this.emptyCart();
    this.productService.deleteFromCart(id, localStorage.getItem('username')).subscribe(() => {
    });
  }

  productsTotalCost() {
    let sum = 0;
    this.listOfProducts.forEach(cart => sum += cart.price * this.getQuantity(cart.id));
    return sum;
  }

  productsCost(id: number) {
    let sum = 0;
    this.listOfProducts.filter( product => product.id === id).forEach( cart => sum = cart.price * this.getQuantity(cart.id) );
    sum.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&.');
    sum.toString().substring(0,sum.toString().length-2);
    return sum;
  }

  ngOnDestroy() {
    this.productService.postCart(localStorage.getItem('username'), this.cart).subscribe();
  }

  modalFunction() {
    // this.notifier.notify('success','Placed order successfully');
  }

}
