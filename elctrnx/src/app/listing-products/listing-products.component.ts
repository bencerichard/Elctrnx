import { Component, OnInit } from '@angular/core';
import {Product} from "../Product";
import {ProductService} from "../Product.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {User} from "../User";
import {UserService} from "../User.service";

@Component({
  selector: 'app-listing-products',
  templateUrl: './listing-products.component.html',
  styleUrls: ['./listing-products.component.css']
})
export class ListingProductsComponent implements OnInit {

  appleProducts: Product[];
  samsungProducts: Product[];
  sonyProducts: Product[];
  asusProducts: Product[];
  dellProducts: Product[];
  beatsProducts: Product[];
  boseProducts: Product[];
  jblProducts: Product[];
  lgProducts: Product[];
  smartPhones: Product[];
  tvs: Product[];
  headphones: Product[];
  speakers: Product[];
  smartWatches: Product[];
  smartHome: Product[];
  tablets: Product[];
  laptops: Product[];

  user: Observable<User> = this.userService.getUserByUsername(localStorage.getItem('username'));

  clientName: string;

  prepareClientName (){
    this.user.subscribe( user => {
      let userArray = user.fullName.split(" ",2);
      this.clientName = userArray[1].charAt(0).toUpperCase().concat(userArray[0].charAt(0).toUpperCase())
    } );
  }

  constructor(private productService: ProductService,
              public route: ActivatedRoute,
              private userService:UserService) { }

  ngOnInit(): void {
    this.getProducts();
    this.prepareClientName();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(
      products => {
        this.appleProducts = products.filter( p =>  p.producer === "Apple" );
        this.samsungProducts = products.filter( p =>  p.producer === "Samsung" );
        this.sonyProducts = products.filter( p =>  p.producer === "Sony" );
        this.asusProducts = products.filter( p =>  p.producer === "Asus" );
        this.dellProducts = products.filter( p =>  p.producer === "Dell" );
        this.beatsProducts = products.filter( p =>  p.producer === "Beats" );
        this.boseProducts = products.filter( p =>  p.producer === "Bose" );
        this.jblProducts = products.filter( p =>  p.producer === "JBL" );
        this.lgProducts = products.filter( p =>  p.producer === "LG" );
        this.smartPhones = products.filter( p =>  p.categoryName === "Smartphones" );
        this.headphones = products.filter( p =>  p.categoryName === "Headphones" );
        this.tvs = products.filter( p =>  p.categoryName === "Smart TVs" );
        this.speakers = products.filter( p =>  p.categoryName === "Speakers" );
        this.smartWatches = products.filter( p =>  p.categoryName === "Smartwatches" );
        this.smartHome = products.filter( p =>  p.categoryName === "Smart Home Kits" );
        this.tablets = products.filter( p =>  p.categoryName === "Tablets" );
        this.laptops = products.filter( p =>  p.categoryName === "Laptops" );
      }
    );
  }

}