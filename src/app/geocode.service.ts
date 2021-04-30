import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Address} from './models/Address';

@Injectable({providedIn: 'root'})
export class GeocodeService {

  private geocodeApiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  private apiKey = 'AIzaSyBWpVIWGZ83v5Pj2On1q0F_1HD2foDaVAs';

  constructor(private http: HttpClient) {
  }

  getGeocode(address: Address): Observable<any> {
    return this.http.get<any>(this.geocodeApiUrl + address.number + '+' + address.street + '+' + address.city + '+' + address.country + '&key=' + this.apiKey);
  }
}
