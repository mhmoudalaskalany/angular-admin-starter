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
    return this.get<Permission>({ APIName: `Get/${id}` });
  }

  get permissions() {
    return this.get<Permission[]>({ APIName: 'GetAll' });
  }

  add(body: Permission) {
    return this.post<Permission>({ APIName: 'Add', body, showAlert: true });
  }

  update(body: Permission) {
    return this.put({ APIName: 'Update', body, showAlert: true });
  }

  remove(id: string) {
    return this.delete({ APIName: `DeleteSoft/${id}`, showAlert: true });
  }

  assignPermissionToRole(body: any) {
    return this.post<boolean>({ APIName: 'AssignPermissionsToRole', body, showAlert: true });
  }

  getRolePermissions(roleId: string) {
    return this.get<Permission[]>({ APIName: `GetRolePermissions/${roleId}` });
  }
}
