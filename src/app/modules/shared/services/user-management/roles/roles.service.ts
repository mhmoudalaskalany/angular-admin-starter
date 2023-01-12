import { Injectable } from '@angular/core';
import { HttpService } from 'app/modules/core/services/http/http.service';
import { Role } from 'app/modules/shared/interfaces/lookups/lookups';

@Injectable({
  providedIn: 'root'
})
export class RolesService extends HttpService {

  protected get baseUrl(): string {
    return 'Roles/';
  }

  getRole(id: string) {
    return this.get<Role>({ APIName: `Get/${id}` });
  }

  get roles() {
    return this.get<Role[]>({ APIName: 'GetAll' });
  }

  add(body: Role) {
    return this.post<Role>({ APIName: 'Add', body, showAlert: true });
  }

  update(body: Role) {
    return this.put({ APIName: 'Update', body, showAlert: true });
  }

  remove(id: string) {
    return this.delete({ APIName: `DeleteSoft/${id}`, showAlert: true });
  }
}
