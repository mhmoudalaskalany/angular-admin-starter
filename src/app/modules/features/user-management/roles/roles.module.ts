import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesComponent } from './pages/roles/roles.component';
import { RolesRoutingModule } from './roles-routing.module';
import { AddEditRoleComponent } from './components/add-edit-role/add-edit-role.component';
import { AssignPermissionsToRoleComponent } from './components/assign-permissions-to-role/assign-permissions-to-role.component';
import { BaseSharedModule } from 'shared/sub-modules/base-shared/base-shared.module';
import { SharedModule } from 'shared/shared.module';

@NgModule({
  declarations: [RolesComponent, AddEditRoleComponent, AssignPermissionsToRoleComponent],
  imports: [CommonModule, RolesRoutingModule, SharedModule, BaseSharedModule]
})
export class RolesModule {}
