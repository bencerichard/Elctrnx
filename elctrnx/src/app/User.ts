import {Role} from "./Role";

export class User {
  username:string;
  password:string;
  confirmPassword:string;
  fullName:string;
  emailAddress:string;
  role:Role;
  cart:Cart[];

}

export class Cart {
  productId:number;
  quantity:number;
}
