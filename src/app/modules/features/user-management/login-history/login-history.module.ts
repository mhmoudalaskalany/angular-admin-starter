import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginHistoryComponent } from './pages/login-history/login-history.component';
import { LoginHistoryRoutingModule } from './login-history-routing.module';
import { SharedModule } from 'shared/shared.module';
import { BaseSharedModule } from 'shared/sub-modules/base-shared/base-shared.module';


@NgModule({
  declarations: [
    LoginHistoryComponent
  ],
  imports: [
    CommonModule,
    LoginHistoryRoutingModule,
    SharedModule,
    BaseSharedModule
  ]
})
export class LoginHistoryModule { }
