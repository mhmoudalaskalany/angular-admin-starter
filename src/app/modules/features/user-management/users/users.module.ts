import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersComponent } from './pages/users/users.component';
import { UsersRoutingModule } from './users-routing.module';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';
import { SharedModule } from 'shared/shared.module';
import { BaseSharedModule } from 'shared/sub-modules/base-shared/base-shared.module';

@NgModule({
  declarations: [
    UsersComponent,
    AddEditUserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    BaseSharedModule
  ]
})
export class UsersModule { }
