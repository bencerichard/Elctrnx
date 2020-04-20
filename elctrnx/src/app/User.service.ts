import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./User";

@Injectable({providedIn: 'root'})
export class UserService {

  private userUrl = 'http://localhost:8080/users/';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

  getSingleUser(id: number): Observable<User> {
    return this.http.get<User>(this.userUrl + id);
  }

  newUser(user: User): Observable<User> {
    return this.http.post<User>(this.userUrl, user, this.httpOptions);
  }

  updateUser(id:number,user: User): Observable<User> {
    return this.http.put<User>(this.userUrl + id, user, this.httpOptions);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(this.userUrl + id, this.httpOptions);
  }


}
