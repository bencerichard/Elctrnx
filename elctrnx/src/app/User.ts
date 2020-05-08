import {Role} from "./Role";

export class User {
  username:string;
  password:string;
  confirmPassword:string;
  fullName:string;
  emailAddress:string;
  role:Role;
  cart:Cart[];
  favorites: Favorites[];
  image: Image;
}

export class Image {
  name:string;
  type:string;
  picByte:any;
}

export class Cart {
  productId:number;
  quantity:number;
}

export class Favorites {
  productId:number;
}

export interface  OrderInput {
  username: string;
  productList: Cart[];
  favoritesList: Favorites[];
}
