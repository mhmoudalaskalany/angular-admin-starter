import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginHistoryComponent } from './pages/login-history/login-history.component';
const routes: Routes = [
  {
    path: '',
    data: { title: 'USER_MANAGEMENT.LOGINHISTORY.TITLE', pageType: 'list' },
    component: LoginHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginHistoryRoutingModule { }
