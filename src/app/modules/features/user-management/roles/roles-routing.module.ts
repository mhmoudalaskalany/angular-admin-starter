import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogComponent } from 'shared/components/dialog/dialog.components';
import { AddEditRoleComponent } from './components/add-edit-role/add-edit-role.component';
import { AssignPermissionsToRoleComponent } from './components/assign-permissions-to-role/assign-permissions-to-role.component';
import { RolesComponent } from './pages/roles/roles.component';

const routes: Routes = [
  {
    path: '',
    data: { title: 'USER_MANAGEMENT.ROLES.TITLE', pageType: 'list' },
    component: RolesComponent,
    children: [
      {
        path: 'add',
        data: { component: AddEditRoleComponent, pageTitle: 'USER_MANAGEMENT.ROLES.ADD', pageType: 'add' },
        component: DialogComponent
      },
      {
        path: 'edit',
        children: [
          { path: '', redirectTo: '', pathMatch: 'full' },
          {
            path: ':id',
            data: { component: AddEditRoleComponent, redirectTo: '/user-management/roles', pageTitle: 'USER_MANAGEMENT.ROLES.EDIT', pageType: 'edit' },
            component: DialogComponent
          }
        ]
      },
      {
        path: 'assign-permissions-to-role/:roleId',
        data: { component: AssignPermissionsToRoleComponent, redirectTo: '/user-management/roles' },
        component: DialogComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
