import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'base/components/base-list-component';
import { Shell } from 'base/components/shell';
import { takeUntil } from 'rxjs';
import { TableOptions } from 'shared/interfaces/table/table';
import { SamplesService } from 'shared/services/samples/samples.service';

@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.scss']
})
export class SamplesComponent extends BaseListComponent {
  isEnglish = false;
  tableOptions!: TableOptions;
  get service(): SamplesService {
    return Shell.Injector.get(SamplesService);
  }
  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    this.localize.currentLanguage$.pipe(takeUntil(this.destroy$)).subscribe(() => this.initializeTableOptions());
    super.ngOnInit();
  }

  initializeTableOptions() {
    this.tableOptions = {
      inputUrl: {
        endPoint: 'v1/samples/getPaged',
        method: 'POST',
        delete: 'v1/samples/deleteSoft'
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'SAMPLES',
        allowAll: true,
        listOfPermissions: []
      },
      bodyOptions: {
        filter: {},
        pageNumber: 1,
        pageSize: 10
      },
      responsiveDisplayedProperties: ['nameEn', 'nameAr', 'code', 'createdDate']
    };
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: 'test',
        header: 'SAMPLES.SAMPLE',
        filter: false,
        filterMode: 'text'
      },
      {
        field: 'startDate',
        header: 'FIELDS.START_DATE',
        filter: false,
        filterMode: 'date'
      },
      {
        field: 'endDate',
        header: 'FIELDS.END_DATE',
        filter: false,
        filterMode: 'date'
      },
      {
        field: 'createdDate',
        header: 'COMMON.CREATED_DATE',
        filter: false,
        filterMode: 'date'
      }
    ];
  }

  initializeTableActions(): TableOptions['inputActions'] {
    return [
      {
        name: 'EDIT',
        icon: 'bx bx-edit',
        color: 'text-middle',
        isEdit: true,
        route: 'edit/',
        allowAll: true
      },
      {
        name: 'DELETE',
        icon: 'bx bx-trash',
        color: 'text-error',
        isDelete: true,
        allowAll: true
      }
    ];
  }
}
