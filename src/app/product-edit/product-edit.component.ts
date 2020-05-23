import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Cart, User} from "../User";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../Product.service";
import {AuthenticationService} from "../Authentication.service";
import {UserService} from "../User.service";
import {NotifierService} from "angular-notifier";
import {Location} from "@angular/common";
import {Product} from "../Product";
import {FormControl, FormGroup, Validators} from "@angular/forms";

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
  id;
  listOfProducts: Product[] = [];
  cart: Cart[] = [];

  productForm: FormGroup = new FormGroup({

    id: new FormControl('99'),
    productName: new FormControl('',
      [
        Validators.required,
        Validators.minLength(4),
      ]),
    categoryName: new FormControl('',
      [
        Validators.required,
        Validators.minLength(2),
      ]),
    image: new FormControl('',
      [
        Validators.required,
        Validators.minLength(10),
      ]),
    price: new FormControl('',
      [
        Validators.required,
        Validators.pattern(/^\d+$/),
      ]),
    description: new FormControl('',
      [
        Validators.required,
        Validators.minLength(15),
      ]),
  });

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

      if (this.route.snapshot.url.toString().includes('edit')) {
      const pricePattern = /^\d+$/;


      this.id = +this.route.snapshot.paramMap.get('id');
      this.productService.getSingleProduct(localStorage.getItem('username'),this.id).subscribe(data => {
          this.productForm = new FormGroup({

            productName: new FormControl(data.productName,
              [
                Validators.required,
                Validators.minLength(4),
              ]),
            categoryName: new FormControl(data.categoryName,
              [
                Validators.required,
                Validators.minLength(2),
              ]
            ),
            image: new FormControl(data.image,
              [
                Validators.required,
                Validators.minLength(10),
              ]
            ),
            price: new FormControl(data.price,
              [
                Validators.required,
                Validators.pattern(pricePattern),
              ]
            ),
            description: new FormControl(data.description,
              [
                Validators.required,
                Validators.minLength(10),
              ]
            ),
          });
        }
      );

        this.getUserCart(localStorage.getItem('username'));
    }


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

  save(): void {

    if (this.route.snapshot.url.toString().includes('edit')) {
      this.productService.updateProduct(this.productForm.value, this.id)
        .subscribe(() => this.goBack());
    } else if (this.route.snapshot.url.toString().includes('add')) {

      this.productService.newProduct(this.productForm.value).subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
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
}
