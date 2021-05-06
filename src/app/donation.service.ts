import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Donation} from './models/Donation';
import {environment} from '../environments/environment';

@Injectable({providedIn: 'root'})
export class DonationService {

  private donationsUrl = environment.API_URL + '/donation/';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  createDonation(donation: Donation): Observable<Donation> {
    return this.http.post<Donation>(this.donationsUrl, donation, this.httpOptions);
  }

}
