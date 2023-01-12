import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'app/modules/shared/shared.module';
import { LoginHistoryComponent } from './pages/login-history/login-history.component';
import { LoginHistoryRoutingModule } from './login-history-routing.module';
import { BaseSharedModule } from 'app/modules/shared/sub-modules/base-shared/base-shared.module';


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
