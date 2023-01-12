import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './pages/account/account.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: AccountComponent,
    data: { type: 'SIGNIN' }
  },
  // {
  //   path: 'register',
  //   component: AccountComponent,
  //   data: { type: 'SIGNUP' }
  // },
  {
    path: 'forget-password',
    component: AccountComponent,
    data: { type: 'FORGET_PASSWORD' }
  },
  // {
  //   path: 'complete-registration',
  //   component: AccountComponent,
  //   data: { type: 'COMPLETE_SIGNUP' }
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
