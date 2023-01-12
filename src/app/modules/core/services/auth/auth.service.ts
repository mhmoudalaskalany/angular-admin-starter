import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { UsersService } from 'shared/services/user-management/users/users.service';
import { Permission } from 'shared/interfaces/lookups/lookups';

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
