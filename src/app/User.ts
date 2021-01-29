import {Role} from './Role';

export class User {
  username: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  emailAddress: string;
  role: Role;
  cart: Cart[];
  favorites: Favorites[];
  image: Image;
  addressDTO: DeliveryLocations;
}

export class Image {
  name: string;
  type: string;
  picByte: any;
}

export class Cart {
  productId: number;
  quantity: number;
}

export class AgmMarkerModel {
  agmInfoId: number;
  lat: string;
  lng: string;
  numberOfDonations: number;
  name: string;
}
export class Favorites {
  productId: number;
}

export interface OrderInput {
  userId: string;
  productsList: Cart[];
  deliveryLocation: DeliveryLocations
}

export interface OrderInput2 {
  userId: string;
  productsList: Cart[];
  deliveryLocation: DeliveryLocations,
  orderTimestamp: Date
}

export class DeliveryLocations {
  addressCountry: string;
  addressCity: string;
  addressStreet: string;
}
