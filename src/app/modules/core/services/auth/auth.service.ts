import { Injectable } from '@angular/core';
import { Permission } from 'app/modules/shared/interfaces/lookups/lookups';
import { UsersService } from 'app/modules/shared/services/user-management/users/users.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userPermissions: BehaviorSubject<Permission[] | any> = new BehaviorSubject(null);

  constructor(private usersService: UsersService) { }

  get userPermissions$(): Observable<Permission[]> {
    if (this.userPermissions.value) {
      return this.userPermissions.asObservable();
    }

    return this.usersService.getUserPermissions().pipe(map(value => {
      this.userPermissions.next(value);
      return value;
    }));
  }
}
