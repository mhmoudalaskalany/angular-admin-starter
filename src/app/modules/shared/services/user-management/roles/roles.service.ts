import { Injectable } from '@angular/core';
import { HttpService } from 'core/services/http/http.service';
import { Role } from 'shared/interfaces/lookups/lookups';
@Injectable({
  providedIn: 'root'
})
export class RolesService extends HttpService {

  protected get baseUrl(): string {
    return 'Roles/';
  }

  getRole(id: string) {
    return this.get<Role>({ apiName: `Get/${id}` });
  }

  get roles() {
    return this.get<Role[]>({ apiName: 'GetAll' });
  }

  add(body: Role) {
    return this.post<Role, Role>({ apiName: 'Add' }, body);
  }

  update(body: Role) {
    return this.put({ apiName: 'Update' }, body);
  }

  remove(id: string) {
    return this.delete({ apiName: `DeleteSoft/` }, id);
  }
}
