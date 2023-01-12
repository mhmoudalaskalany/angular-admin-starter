import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// -------- Modules --------
// NgSelect Module
import { NgSelectModule } from '@ng-select/ng-select';
// ngApexCharts Module
import { NgApexchartsModule } from "ng-apexcharts";
// NG-Bootstrap - Pagination
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
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
import { TableComponent } from './components/table/table.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { BaseSharedModule } from './sub-modules/base-shared/base-shared.module';
import { DeferredShoppersComponent } from './components/deferred-shoppers/deferred-shoppers.component';

const COMPONENTS = [
  InputTextComponent,
  DropdownComponent,
  DatepickerComponent,
  CheckboxComponent,
  AttachmentComponent,
  DeleteModalComponent,
  TableComponent,
  DeferredShoppersComponent,
  PaginatorComponent, // unused...
];

@NgModule({
  declarations: [
    // Components
    ...COMPONENTS,

    // Pipes
    ValidationHandlerPipe,
  ],
  imports: [
    CommonModule,
    BaseSharedModule,

    NgSelectModule,
    NgbPaginationModule,
    NgApexchartsModule,
    TableModule,
  ],
  exports: [
    // Components
    ...COMPONENTS
  ]
})
export class SharedModule { }
