import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './pages/account/account.component';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from 'shared/shared.module';
import { BaseSharedModule } from 'shared/sub-modules/base-shared/base-shared.module';


@NgModule({
  declarations: [
    AccountComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    BaseSharedModule
  ]
})
export class AccountModule { }
