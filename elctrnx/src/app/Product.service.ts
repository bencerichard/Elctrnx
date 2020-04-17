import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "./Product";

@Injectable({providedIn: 'root'})
export class ProductService {

  private produtcsUrl='http://localhost:8080/products';

  httpOptions={
    headers:new HttpHeaders({'Content-Type':'application/json'})
  };

  constructor(private http:HttpClient){}

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.produtcsUrl);
  }

}
