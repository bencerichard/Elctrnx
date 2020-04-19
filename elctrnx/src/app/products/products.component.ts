import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Product} from '../Product';
import {Location} from "@angular/common";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products2: Product[] = [
    {
      id: 1,
      name: "Iphone 11 Pro 256 Gb",
      price: 5600,
      image: "assets/img/iphone11.jpg"
    },
    {
      id: 1,
      name: "Dell 11 Pro 1Tb, 256 SSD full",
      price: 5600,
      image: "assets/img/dellLogo.png"
    },
    {
      id: 1,
      name: "Iphone 11 Pro 256 Gb",
      price: 5600,
      image: "assets/img/iphone11.jpg"
    },
    {
      id: 5,
      name: "Product1",
      price: 5600,
      image: "assets/img/iphone11.jpg"
    },
    {
      id: 1,
      name: "Iphone 11 Pro 256 Gb",
      price: 5600,
      image: "https://s12emagst.akamaized.net/products/25344/25343964/images/res_078b9a9407015da56782daa40ae21486_full.jpg"
    }
  ];
  products: Product[] = [
    {
      id: 1,
      name: "Smart TV android Sony bra alo calo",
      price: 5600,
      image: "assets/img/iphone11.jpg"
    },
    {
      id: 1,
      name: "Samsung Galaxy S20 64 Gb",
      price: 5400,
      image: "assets/img/samsungS20.jpg"
    },
    {
      id: 1,
      name: "Dell 11 Pro 1Tb, 256 SSD ",
      price: 5200,
      image: "assets/img/asusZen.jpg"
    },
    {
      id: 1,
      name: "Iphone 11 Pro 256 Gb",
      price: 5000,
      image: "assets/img/sonyBravia.jpg"
    },
    {
      id: 5,
      name: "Product1 asd sa dsa asd",
      price: 4800,
      image: "assets/img/iphone11.jpg"
    }
  ];

  constructor(
    private router: Router,
    private location: Location
  ) {
  }

  ngOnInit(): void {
  }

  searchApple(): void {
    this.router.navigate(['/my-account']);
  }

}
