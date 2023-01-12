import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogComponent } from 'app/modules/shared/components/dialog/dialog.components';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {
    path: '',
    data: { title: 'USER_MANAGEMENT.USERS.TITLE', pageType: 'list' },
    component: UsersComponent,
    children: [
      {
        path: 'add',
        data: { component: AddEditUserComponent, pageTitle: 'USER_MANAGEMENT.USERS.ADD', pageType: 'add' },
        component: DialogComponent
      },
      {
        path: 'edit',
        children: [
          { path: '', redirectTo: '', pathMatch: 'full' },
          {
            path: ':id',
            data: { component: AddEditUserComponent, redirectTo: '/user-management/users', pageTitle: 'USER_MANAGEMENT.USERS.EDIT', pageType: 'edit' },
            component: DialogComponent
          }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
