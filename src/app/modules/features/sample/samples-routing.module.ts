import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditSampleComponent } from './pages/add-edit-sample/add-edit-sample.component';
import { SamplesComponent } from './pages/samples/samples.component';

const routes: Routes = [
  {
    path: '',
    data: { title: 'SAMPLES.TITLE' },
    component: SamplesComponent
  },
  {
    path: 'add',
    component: AddEditSampleComponent,
    data: {
      pageTitle: 'SAMPLES.ADD',
      pageType: 'add',
      redirectTo: '/samples-management/samples'
    }
  },
  {
    path: 'edit/:id',
    component: AddEditSampleComponent,
    data: {
      redirectTo: '/samples-management/samples',
      pageTitle: 'SAMPLES.EDIT',
      pageType: 'edit'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SamplesRoutingModule {}
