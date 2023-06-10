import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'shared/shared.module';
import { BaseSharedModule } from 'shared/sub-modules/base-shared/base-shared.module';
import { AddEditSampleComponent } from './pages/add-edit-sample/add-edit-sample.component';
import { SamplesComponent } from './pages/samples/samples.component';
import { SamplesRoutingModule } from './samples-routing.module';

@NgModule({
  declarations: [SamplesComponent, AddEditSampleComponent],
  imports: [CommonModule, SamplesRoutingModule, SharedModule, BaseSharedModule]
})
export class SamplesModule {}
