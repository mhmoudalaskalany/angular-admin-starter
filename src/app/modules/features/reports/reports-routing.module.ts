import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportType, SortType } from './enums/report-type';
import { ReportsComponent } from './pages/reports/reports.component';
import { TransactionsReportsComponent } from './pages/transactions-reports/transactions-reports.component';

const routes: Routes = [
  { path: '', redirectTo: 'highest-earning', pathMatch: 'full' },
  {
    path: 'highest-earning',
    data: {
      title: 'REPORTS.HIGHEST_EARNING', filter: { reportType: ReportType.Earning, sortType: SortType.Desc, count: 20 },
      table: {
        getAllAPI: 'Products/GetProductsReport',
      }
    },
    component: ReportsComponent
  },
  {
    path: 'lowest-earning',
    data: {
      title: 'REPORTS.LOWEST_EARNING', filter: { reportType: ReportType.Earning, sortType: SortType.Asc, count: 20 },
      table: {
        getAllAPI: 'Products/GetProductsReport',
      }
    },
    component: ReportsComponent
  },
  {
    path: 'high-in-demand',
    data: {
      title: 'REPORTS.HIGH_IN_DEMAND', filter: { reportType: ReportType.Demand, sortType: SortType.Desc, count: 20 },
      table: {
        getAllAPI: 'Products/GetProductsReport',
      }
    },
    component: ReportsComponent
  },
  {
    path: 'low-in-demand',
    data: {
      title: 'REPORTS.LOW_IN_DEMAND', filter: { reportType: ReportType.Demand, sortType: SortType.Asc, count: 20 },
      table: {
        getAllAPI: 'Products/GetProductsReport',
      }
    },
    component: ReportsComponent
  },
  {
    path: 'transactions-by-year',
    data: {
      title: 'REPORTS.TRANSACTIONS_BY_YEAR',
      table: {
        filter: { perYear: true, year: new Date().getFullYear() }, dateFormat: 'YYYY'
      }
    },
    component: TransactionsReportsComponent
  },
  {
    path: 'transactions-by-month',
    data: {
      title: 'REPORTS.TRANSACTIONS_BY_MONTH',
      table: {
        filter: { perMonth: true, perYear: true, month: 6, year: new Date().getFullYear() }, dateFormat: 'MMM-YYYY'
      }
    },
    component: TransactionsReportsComponent
  },
  {
    path: 'transactions-by-day',
    data: {
      title: 'REPORTS.TRANSACTIONS_BY_DAY',
      table: {
        filter: { perDay: true, perMonth: true, perYear: true, day: new Date().getDay(), month: 6, year: new Date().getFullYear() }, dateFormat: 'EEEE, MM MMM-YYYY'
      }
    },
    component: TransactionsReportsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
