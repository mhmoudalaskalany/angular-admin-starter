import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './modules/core/components/layout/layout.component';
import { AuthGuard } from './modules/core/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'account',
    pathMatch: 'full'
  },
  {
    path: 'account',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/features/account/account.module').then(m => m.AccountModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./modules/features/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'lookups',
        loadChildren: () => import('./modules/features/lookups/lookups.module').then(m => m.LookupsModule)
      },
      {
        path: 'user-management',
        loadChildren: () => import('./modules/features/user-management/user-management.module').then(m => m.UserManagement)
      },
      {
        path: 'reports',
        loadChildren: () => import('./modules/features/reports/reports.module').then(m => m.ReportsModule)
      },
    ]
  },
  { path: 'error', loadChildren: () => import('./modules/features/error/error.module').then(m => m.ErrorModule) },
  { path: '**', redirectTo: '/error/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
