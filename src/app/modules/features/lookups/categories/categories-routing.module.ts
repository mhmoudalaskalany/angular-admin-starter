import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogComponent } from 'app/modules/shared/components/dialog/dialog.components';
import { AddEditCategoryComponent } from './components/add-edit-category/add-edit-category.component';
import { CategoriesComponent } from './pages/categories/categories.component';

const routes: Routes = [
  {
    path: '',
    data: { title: 'SETTINGS.CATEGORIES.TITLE' },
    component: CategoriesComponent,
    children: [
      {
        path: 'add',
        data: { component: AddEditCategoryComponent, pageTitle: 'SETTINGS.CATEGORIES.ADD', pageType: 'add' },
        component: DialogComponent
      },
      {
        path: 'edit',
        children: [
          { path: '', redirectTo: '', pathMatch: 'full' },
          {
            path: ':id',
            data: { component: AddEditCategoryComponent, redirectTo: '/lookups/categories', pageTitle: 'SETTINGS.CATEGORIES.EDIT', pageType: 'edit' },
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
export class CategoriesRoutingModule { }
