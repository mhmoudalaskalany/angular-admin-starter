import { Injectable } from '@angular/core';
import { HttpService } from 'core/services/http/http.service';
import { Permission } from 'shared/interfaces/lookups/lookups';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService extends HttpService {

  protected get baseUrl(): string {
    return 'Permissions/';
  }

  getPermission(id: string) {
    return this.get<Permission>({ apiName: `Get/${id}` });
  }

  get permissions() {
    return this.get<Permission[]>({ apiName: 'GetAll' });
  }

  add(body: Permission) {
    return this.post<Permission, Permission>({ apiName: 'Add' }, body);
  }

  update(body: Permission) {
    return this.put({ apiName: 'Update' }, body);
  }

  remove(id: string) {
    return this.delete({ apiName: `DeleteSoft/` }, id);
  }

  assignPermissionToRole(body: any) {
    return this.post<boolean, boolean>({ apiName: 'AssignPermissionsToRole' }, body);
  }

  getRolePermissions(roleId: string) {
    return this.get<Permission[]>({ apiName: `GetRolePermissions/${roleId}` });
  }
}
