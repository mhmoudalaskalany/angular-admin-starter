import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './pages/reports/reports.component';
import { SharedModule } from 'shared/shared.module';
import { TransactionsReportsComponent } from './pages/transactions-reports/transactions-reports.component';
import { BaseSharedModule } from 'shared/sub-modules/base-shared/base-shared.module';

@NgModule({
  declarations: [
    ReportsComponent,
    TransactionsReportsComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    BaseSharedModule
  ]
})
export class ReportsModule { }
