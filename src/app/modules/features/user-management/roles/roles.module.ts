import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'app/modules/shared/shared.module';
import { RolesComponent } from './pages/roles/roles.component';
import { RolesRoutingModule } from './roles-routing.module';
import { AddEditRoleComponent } from './components/add-edit-role/add-edit-role.component';
import { BaseSharedModule } from 'app/modules/shared/sub-modules/base-shared/base-shared.module';
import { AssignPermissionsToRoleComponent } from './components/assign-permissions-to-role/assign-permissions-to-role.component';


@NgModule({
  declarations: [
    RolesComponent,
    AddEditRoleComponent,
    AssignPermissionsToRoleComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    SharedModule,
    BaseSharedModule
  ]
})
export class RolesModule { }
