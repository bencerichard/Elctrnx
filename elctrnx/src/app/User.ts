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
