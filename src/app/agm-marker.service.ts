import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "./Product";
import {AgmMarkerModel, Cart, OrderInput, User} from './User';
import {AgmMarker} from '@agm/core';

@Injectable({providedIn: 'root'})
export class AgmMarkerService {

  // private agmMarkersUrl = 'https://elctrnx-spring.herokuapp.com/agmMarker/';
  private agmMarkersUrl = 'http://localhost:8080/agmMarker/';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getAgmMarkers(): Observable<AgmMarkerModel[]> {
   return  this.http.get<AgmMarkerModel[]>(this.agmMarkersUrl);
  }

  getAgmMarkerById(id: number): Observable<AgmMarkerModel> {
    return this.http.get<AgmMarkerModel>(this.agmMarkersUrl + '/' + id);
  }
}
