import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from './models/Product';
import {Stock} from './models/Stock';
import {environment} from '../environments/environment';

@Injectable({providedIn: 'root'})
export class StockService {

  constructor(private http: HttpClient) {
  }

  private apiUrl = environment.API_URL + '/stocks';
  private emailUrl = environment.API_URL + '/email';

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
