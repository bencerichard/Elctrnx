import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {User} from '../models/User';
import {UserService} from '../User.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private userService: UserService, private router: Router) {
  }

  user: Observable<User> = this.userService.getUserByUsername(localStorage.getItem('username'));
  isAdmin = this.userService.getUserByUsername(localStorage.getItem('username')).subscribe(user => {
    return user.role.roleName === 'Admin';
  }, error => {
    return false;
  });

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    setTimeout(() => {
    }, 5000);

    if (this.isAdmin) {
      return true;
    }
    this.router.navigate(['/not-found']);
    return false;
  }
}
