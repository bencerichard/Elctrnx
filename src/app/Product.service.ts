import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "./Product";
import {Cart, OrderInput, User} from "./User";

@Injectable({providedIn: 'root'})
export class ProductService {

  // private productsUrl = 'https://elctrnx-spring.herokuapp.com/products/';
  private productsUrl = 'http://localhost:8080/products/';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getProducts(username: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl+ 'all/'+ username);
  }

  getSingleProduct(username: string, id: number): Observable<Product> {
    return this.http.get<Product>(this.productsUrl + username+ '/' + id);
  }

  newProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, product, this.httpOptions);
  }

  updateProduct(product: Product, id: number): Observable<Product> {
    debugger
    return this.http.put<Product>(this.productsUrl + id, product, this.httpOptions);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(this.productsUrl + id);
  }

  // private apiUrl = 'https://elctrnx-spring.herokuapp.com/';
  private apiUrl = 'http://localhost:8080/';

  postOrder(orderInput: OrderInput) {
    return this.http.post(this.apiUrl + 'orders', orderInput, this.httpOptions);
  }

  postCart(username: string, cart: Cart[]) {
    return this.http.patch(this.apiUrl + 'users/' + username, {cart}, this.httpOptions);
  }

  deleteFromCart(productId: number, username: string) {
    return this.http.delete(this.apiUrl + 'cart/' + productId + '/' + username);
  }

  deleteCartAfterCheckout(username: string) {
    return this.http.delete(this.apiUrl + 'cart/' + username);
  }

}
