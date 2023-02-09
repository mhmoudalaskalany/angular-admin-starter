import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslationService } from 'core/services/translation/translation.service';
import { Subject, takeUntil } from 'rxjs';
import { TableOptions } from 'shared/interfaces/table/table';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {
  isEnglish = false;
  title = '';
  pageType = '';
  tableOptions!: TableOptions | undefined;

  /* subscriber to unsubscribe when leaving the component */
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private activatedRoute: ActivatedRoute, private translation: TranslationService) {}

  ngOnInit(): void {
    this.title = this.activatedRoute.snapshot.data['title'];
    this.pageType = this.activatedRoute.snapshot.data['pageType'];

    this.translation.currentLanguage$.pipe(takeUntil(this.destroy$)).subscribe(() => this.initializeTableOptions());
  }

  initializeTableOptions() {
    this.tableOptions = undefined;

    this.tableOptions = {
      inputUrl: {
        getAll: 'Permissions/GetPaged',
        getAllMethod: 'POST',
        delete: 'Permissions/DeleteSoft'
      },
      permissions: {
        componentName: 'TEMPLATE-CATEGORIES',
        allowAll: true,
        listOfPermissions: []
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      responsiveDisplayedProperties: ['nameEn', 'nameAr'],
      bodyOptions: {
        pageNumber: 1,
        pageSize: 10,
        orderByValue: [{ colId: 'id', sort: 'asc' }],
        filter: null
      }
    };
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: this.isEnglish ? 'nameEn' : 'nameAr',
        header: 'FIELDS.NAME',
        filter: false,
        filterMode: 'text'
      },
      {
        field: 'code',
        header: 'FIELDS.CODE',
        filter: false,
        filterMode: 'text'
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

  /* when leaving the component */
  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
