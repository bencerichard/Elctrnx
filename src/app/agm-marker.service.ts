import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AgmMarkerModel} from './models/User';

@Injectable({providedIn: 'root'})
export class AgmMarkerService {

  private agmMarkersUrl = 'https://elctrnx-backend.herokuapp.com/agmMarker/';
  // private agmMarkersUrl = 'http://localhost:8080/agmMarker/';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getAgmMarkers(): Observable<AgmMarkerModel[]> {
    return this.http.get<AgmMarkerModel[]>(this.agmMarkersUrl);
  }

  getAgmMarkerById(id: number): Observable<AgmMarkerModel> {
    return this.http.get<AgmMarkerModel>(this.agmMarkersUrl + id);
  }

  createAgmMarker(agmMarker: AgmMarkerModel): Observable<AgmMarkerModel> {
    return this.http.post<AgmMarkerModel>(this.agmMarkersUrl, agmMarker, this.httpOptions);
  }

  deleteAgmMarker(agmMarkerId: number): Observable<AgmMarkerModel> {
    return this.http.delete<AgmMarkerModel>(this.agmMarkersUrl + agmMarkerId, this.httpOptions);
  }

  updateAgmMarker(agmMarkerId: number, numberOfMonths: number): Observable<AgmMarkerModel> {
    return this.http.put<AgmMarkerModel>(this.agmMarkersUrl + agmMarkerId + '/' + numberOfMonths, this.httpOptions);
  }
}
