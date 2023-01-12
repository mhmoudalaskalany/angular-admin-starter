import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    /* if user is not logged in return false and redirect to login */
    if (state.url.includes('account')) {
      if (localStorage.getItem('token')) {
        this.router.navigate(['/dashboard']);
        return false;
      } else {
        return true;
      }
    } else {
      if (localStorage.getItem('token')) {
        if (localStorage.getItem('userId')) {
          return this.authService.userPermissions$.pipe(map(permissions => {
            return true;
          }));
        }

        return true;
      } else {
        this.router.navigate(['/account', { redirect: state.url }]);
        return false;
      }
    }
  }
}
