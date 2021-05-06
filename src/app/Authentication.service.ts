import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";

import {User} from "./models/User";
import {Router} from "@angular/router";
import {environment} from '../environments/environment';


@Injectable({providedIn: 'root'})
export class AuthenticationService {
  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;
  private loginUrl = environment.API_URL + '/login';
  isLoggedIn = false;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<User>(this.loginUrl, {username, password})
      .pipe(map(user => {
        if (user) {
          this.isLoggedIn = true;
          debugger
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }))
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isLoggedIn = false;
    this.router.navigate(['/log-in']);
  }

}
