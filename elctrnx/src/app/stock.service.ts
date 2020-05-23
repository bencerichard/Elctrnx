import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from './product';
import {Stock} from './Stock';

@Injectable({providedIn: 'root'})
export class StockService {

  constructor(private http: HttpClient) {
  }

  private apiUrl = 'http://localhost:8080/stocks';
  private emailUrl = 'http://localhost:8080/email';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  getStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.apiUrl);
  }

  sendEmail(product: Product) {
    return this.http.post<any>(this.emailUrl, product, this.httpOptions);
  }
}
