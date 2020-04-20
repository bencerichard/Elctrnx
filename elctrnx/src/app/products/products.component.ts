import {Component, OnInit} from '@angular/core';
import {Product} from '../Product';
import {ProductService} from "../Product.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  product: Product;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) {
  }


  getProducts(): void {
    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
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

  newProduct(categoryName: string, description: string, productName: string, price: number, image: string): void {
    this.productService.newProduct({categoryName,description,productName,price,image} as Product).subscribe();
  }

  updateProduct(categoryName: string, description: string, productName: string, price: number, image: string):void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.updateProduct(id,{categoryName,description,productName,price,image} as Product).subscribe();
  }

  deleteProduct():void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.deleteProduct(id).subscribe();
  }

  ngOnInit(): void {
    this.getProducts();
  }


}
