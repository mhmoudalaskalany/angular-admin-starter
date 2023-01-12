import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionsRoutingModule } from './permissions-routing.module';
import { PermissionsComponent } from './pages/permissions/permissions.component';
import { AddEditPermissionComponent } from './components/add-edit-permission/add-edit-permission.component';
import { SharedModule } from 'shared/shared.module';
import { BaseSharedModule } from 'shared/sub-modules/base-shared/base-shared.module';

@NgModule({
  declarations: [
    PermissionsComponent,
    AddEditPermissionComponent
  ],
  imports: [
    CommonModule,
    PermissionsRoutingModule,
    SharedModule,
    BaseSharedModule
  ]
})
export class PermissionsModule { }
