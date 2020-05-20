import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../User";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../Product.service";
import {AuthenticationService} from "../Authentication.service";
import {UserService} from "../User.service";
import {NotifierService} from "angular-notifier";
import {Location} from "@angular/common";
import {Product} from "../Product";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  product: Product;
  clientName: string;
  user: Observable<User> = this.userService.getUserByUsername(localStorage.getItem('username'));
  private readonly notifier: NotifierService;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private productService: ProductService,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private notifierService: NotifierService,
              private location: Location) {
    this.notifier = notifierService
  }

  ngOnInit(): void {
    this.getProduct();
    this.prepareClientName();
  }

  prepareClientName() {
    this.user.subscribe(user => {
      let userArray = user.fullName.split(" ", 2);
      this.clientName = userArray[1].charAt(0).toUpperCase().concat(userArray[0].charAt(0).toUpperCase());
    });
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

  favorites(): void {
    this.router.navigate(['/listing-products-favorites']);
  }

  logout(): void {
    this.authenticationService.logout();
  }

}
