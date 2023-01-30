import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

import { Permission } from 'shared/interfaces/lookups/lookups';
import { HttpService } from '../http/http.service';
import { ApiResponse } from 'shared/interfaces/response/response';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends HttpService {
  protected get baseUrl(): string {
    return 'v1/Accounts/';
  }
  userPermissions: BehaviorSubject<Permission[] | any> = new BehaviorSubject(null);



  // get userPermissions$(): Observable<Permission[]> {
  //   if (this.userPermissions.value) {
  //     return this.userPermissions.asObservable();
  //   }

  //   return this.usersService.getUserPermissions().pipe(map(value => {
  //     this.userPermissions.next(value);
  //     return value;
  //   }));
  // }


  login(body: any): Observable<any> {
    return this.post<any, ApiResponse<boolean>>({ apiName: 'Login' }, body).pipe(map(result => {
      if (result) {
        this.alertService.success(this.localize.translate.instant('VALIDATION.LOGIN_SUCCESS'));
      } else {
        this.alertService.error(this.localize.translate.instant('VALIDATION.WRONG_USER_OR_PASSWORD'));
      }

      return result;
    }));
  }
  convertTokenJWT(token = localStorage.getItem('token') as string) {
    if (token) {
      let base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'),
        jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

      return JSON.parse(jsonPayload);
    }
  }
}
