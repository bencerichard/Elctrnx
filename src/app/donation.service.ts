import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Donation} from './models/Donation';

@Injectable({providedIn: 'root'})
export class DonationService {

  private donationsUrl = 'http://localhost:8080/donation/';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  createDonation(donation: Donation): Observable<Donation> {
    return this.http.post<Donation>(this.donationsUrl, donation, this.httpOptions);
  }

}
