import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// -------- Modules --------
// NgSelect Module
import { NgSelectModule } from '@ng-select/ng-select';
// ngApexCharts Module
import { NgApexchartsModule } from 'ng-apexcharts';
// TableModule
import { TableModule } from 'primeng/table';

// Pipes
import { ValidationHandlerPipe } from './pipes/validation-handler.pipe';

// Components
import { InputTextComponent } from './components/input-text/input-text.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { AttachmentComponent } from './components/attachment/attachment.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { BaseSharedModule } from './sub-modules/base-shared/base-shared.module';
import { DeferredShoppersComponent } from './components/deferred-shoppers/deferred-shoppers.component';
import { DataTableComponent } from './components/datatable/data-table.component';

const COMPONENTS = [
  InputTextComponent,
  DropdownComponent,
  DatepickerComponent,
  CheckboxComponent,
  AttachmentComponent,
  DeleteModalComponent,
  DataTableComponent,
  DeferredShoppersComponent
];

@NgModule({
  declarations: [
    // Components
    ...COMPONENTS,

    // Pipes
    ValidationHandlerPipe
  ],
  imports: [CommonModule, BaseSharedModule, NgSelectModule, NgApexchartsModule, TableModule],
  exports: [
    // Components
    ...COMPONENTS
  ]
})
export class SharedModule {}
