import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "./Product";

@Injectable({providedIn: 'root'})
export class ProductService {

  private productsUrl = 'http://localhost:8080/products/';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  getSingleProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.productsUrl + id);
  }

  newProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, product, this.httpOptions);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(this.productsUrl + id, product, this.httpOptions);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(this.productsUrl + id);
  }


}
