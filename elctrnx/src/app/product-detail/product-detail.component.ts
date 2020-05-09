import {Component, OnInit} from '@angular/core';
import {ProductService} from "../Product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../Product";
import {AuthenticationService} from "../Authentication.service";
import {Observable} from "rxjs";
import {User} from "../User";
import {UserService} from "../User.service";
import {NotifierService} from "angular-notifier";
import {Location} from "@angular/common";

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
  isAdmin = false;
  showModal = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private notifierService: NotifierService,
    private location: Location) {
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
  }

  logout(): void {
    this.authenticationService.logout();
  }

  favorites(): void {
    this.router.navigate(['/listing-products-favorites']);
  }

  prepareClientName() {
    this.user.subscribe(user => {
      let userArray = user.fullName.split(" ", 2);
      this.clientName = userArray[1].charAt(0).toUpperCase().concat(userArray[0].charAt(0).toUpperCase());
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
}
