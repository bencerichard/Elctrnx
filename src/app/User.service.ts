import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {OrderInput2, User} from "./User";

@Injectable({providedIn: 'root'})
export class UserService {

  // private userUrl = 'https://elctrnx-spring.herokuapp.com/users/';
  private userUrl = 'http://localhost:8080/users/';
https
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

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(this.userUrl + username);
  }

  getAllUsernames(username: string):Observable<string[]>{
    return this.http.get<string[]>(this.userUrl+'/getUsernames/'+username);
  }

  newUser(user: User): Observable<User> {
    return this.http.post<User>(this.userUrl, user, this.httpOptions);
  }

  updateUser(username: string, user: User): Observable<User> {
    return this.http.put<User>(this.userUrl + username, user, this.httpOptions);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(this.userUrl + id, this.httpOptions);
  }

  addToFavorites(username: string, favorites: number) {
    return this.http.patch(this.userUrl + 'favorites/' + username, {productId: favorites}, this.httpOptions);
  }

  deleteFromFavorites(id: number, username: string) {
    return this.http.delete("http://localhost:8080/favorites/" + id + "/" + username);
  }

  getCustomerHoar(username: string):Observable<number> {
    return this.http.get<number>(this.userUrl + username + "/hoar");
  }


  postImage(uploadImageData :FormData, username: string): Observable<any> {
    return this.http.post<any>('http://localhost:8080/image/upload/' +username, uploadImageData)
  }

  getImage(username: string): Observable<any>{
    return this.http.get<any>( 'http://localhost:8080/image/get/' + username);
  }

  getAllOrders(username: string): Observable<OrderInput2[]>{
    return this.http.get<OrderInput2[]>(this.userUrl + username+ '/allOrders');
  }
}
