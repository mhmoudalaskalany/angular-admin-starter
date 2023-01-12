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
    return this.get<User>({ APIName: `Get/${id}` });
  }

  get users() {
    return this.get<User[]>({ APIName: 'GetAll' });
  }

  add(body: User) {
    return this.post<User>({ APIName: 'Add', body, showAlert: true });
  }

  update(body: User) {
    return this.put({ APIName: 'Update', body, showAlert: true });
  }

  remove(id: string) {
    return this.delete({ APIName: `DeleteSoft/${id}`, showAlert: true });
  }

  getUserRoles(userId = localStorage.getItem('userId')) {
    return this.get<Role[]>({ APIName: `GetUserRoles/${userId}` });
  }

  getUserPermissions() {
    return this.get<Permission[]>({ APIName: `GetUserPermissions/${localStorage.getItem('userId')}` });
  }
}
