import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogComponent } from 'shared/components/dialog/dialog.components';
import { AddEditPermissionComponent } from './components/add-edit-permission/add-edit-permission.component';
import { PermissionsComponent } from './pages/permissions/permissions.component';

const routes: Routes = [
  {
    path: '',
    data: { title: 'USER_MANAGEMENT.PERMISSIONS.TITLE', pageType: 'list' },
    component: PermissionsComponent,
    children: [
      {
        path: 'add',
        data: { component: AddEditPermissionComponent, pageTitle: 'USER_MANAGEMENT.PERMISSIONS.ADD', pageType: 'add' },
        component: DialogComponent
      },
      {
        path: 'edit',
        children: [
          { path: '', redirectTo: '', pathMatch: 'full' },
          {
            path: ':id',
            data: { component: AddEditPermissionComponent, redirectTo: '/user-management/permissions', pageTitle: 'USER_MANAGEMENT.PERMISSIONS.EDIT', pageType: 'edit' },
            component: DialogComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionsRoutingModule { }
