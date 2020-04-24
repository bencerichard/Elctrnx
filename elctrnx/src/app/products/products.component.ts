import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from '../Product';
import {ProductService} from "../Product.service";
import {AuthenticationService} from "../Authentication.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  products2: Product[] = [];

  product: Product;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router,
              private authentcationService: AuthenticationService) {
  }


  getProducts(): void {
    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
        this.products2 = products;
      }
    );
  }

  getSingleProduct(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getSingleProduct(id).subscribe(
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
    this.productService.updateProduct(id, {
      categoryName,
      description,
      productName,
      price,
      image,
      producer
    } as Product).subscribe();
  }

  deleteProduct(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.deleteProduct(id).subscribe();
  }

  ngOnInit(): void {
    this.getProducts();
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

  smartphones(): void{
    this.router.navigate(['/listing-products-smartphones']);
  }

  headphones(): void{
    this.router.navigate(['/listing-products-headphones']);
  }

  tvs():void{
    this.router.navigate(['/listing-products-tvs']);
  }

  speakers(): void{
    this.router.navigate(['/listing-products-speakers']);
  }

  smartWatches(): void{
    this.router.navigate(['/listing-products-smartwatches']);
  }

  smartHome(): void{
      this.router.navigate(['/listing-products-smarthome']);
  }

  tablets(): void{
    this.router.navigate(['/listing-products-tablets']);
  }

  laptops(): void{
    this.router.navigate(['/listing-products-laptops']);
  }

  logout(): void {
    this.authentcationService.logout();
  }
}
