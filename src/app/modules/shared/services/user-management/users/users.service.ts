import { Injectable } from '@angular/core';
import { HttpService } from 'core/services/http/http.service';
import { User, Role, Permission } from 'shared/interfaces/lookups/lookups';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends HttpService {

  protected get baseUrl(): string {
    return 'Users/';
  }

  getUser(id: string) {
    return this.get<User>({ apiName: `Get/${id}` });
  }

  get users() {
    return this.get<User[]>({ apiName: 'GetAll' });
  }

  add(body: User) {
    return this.post<User, User>({ apiName: 'Add' }, body);
  }

  update(body: User) {
    return this.put({ apiName: 'Update', }, body);
  }

  remove(id: string) {
    return this.delete({ apiName: `DeleteSoft/` }, id);
  }

  getUserRoles(userId = localStorage.getItem('userId')) {
    return this.get<Role[]>({ apiName: `GetUserRoles/${userId}` });
  }

  getUserPermissions() {
    return this.get<Permission[]>({ apiName: `GetUserPermissions/${localStorage.getItem('userId')}` });
  }
}
