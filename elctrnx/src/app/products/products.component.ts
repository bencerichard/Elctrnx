import {Component, OnInit} from '@angular/core';
import {Product} from '../Product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [
    {
      id: 5,
      name: "asdafd",
      price: 100,
      image: "https://static11.edstatic.net/product_images/470x470/resize/02-dell-inspiron-3576-dll-q1-249739-notebook-windows-10-fekete_fl761aiu.jpg?v=1"
    },
    {
      id: 6,
      name: "aetyyrumd",
      price: 200,
      image: "https://static11.edstatic.net/product_images/470x470/resize/02-dell-inspiron-3576-dll-q1-249739-notebook-windows-10-fekete_fl761aiu.jpg?v=1"
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
