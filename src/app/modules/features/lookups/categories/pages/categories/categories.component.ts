import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'base/components/base-list-component';
import { Shell } from 'base/components/shell';
import { takeUntil } from 'rxjs';
import { TableOptions } from 'shared/interfaces/table/table';
import { CategoriesService } from 'shared/services/categories/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent extends BaseListComponent {
  isEnglish = false;
  tableOptions!: TableOptions;
  get service(): CategoriesService {
    return Shell.Injector.get(CategoriesService);
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
        endPoint: 'v1/categories/getPaged',
        method: 'POST',
        delete: 'v1/categories/deleteSoft'
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'TEMPLATE-CATEGORIES',
        allowAll: true,
        listOfPermissions: []
      },
      bodyOptions: {
        filter: {},
        pageNumber: 1,
        pageSize: 10
      },
      responsiveDisplayedProperties: ['nameEn', 'nameAr', 'description', 'createdDate']
    };
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: 'nameEn',
        header: 'COMMON.ENGLISH_NAME',
        filter: false,
        filterMode: 'text'
      },
      {
        field: 'nameAr',
        header: 'COMMON.ARABIC_NAME',
        filter: false,
        filterMode: 'text'
      },
      {
        field: 'description',
        header: 'COMMON.DESCRIPTION',
        filter: false,
        filterMode: 'text'
      },
      {
        field: 'createdDate',
        header: 'COMMON.CREATED_DATE',
        filter: false,
        filterMode: 'date'
      },
      {
        field: 'modifiedDate',
        header: 'COMMON.MODIFIED_DATE',
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
        route: 'edit/'
      },
      {
        name: 'DELETE',
        icon: 'bx bx-trash',
        color: 'text-error',
        isDelete: true
      }
    ];
  }
}
