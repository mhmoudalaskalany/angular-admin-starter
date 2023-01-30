import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslationService } from 'core/services/translation/translation.service';
import { Subject, takeUntil } from 'rxjs';
import { TableOptions } from 'shared/interfaces/table/table';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  isEnglish = false;
  title = '';
  tableOptions!: TableOptions;

  /* subscriber to unsubscribe when leaving the component */
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private activatedRoute: ActivatedRoute, private translation: TranslationService) {
  }

  ngOnInit(): void {
    this.title = this.activatedRoute.snapshot.data['title'];
    this.translation.currentLanguage$.pipe(takeUntil(this.destroy$)).subscribe(() => this.initializeTableOptions());
  }

  initializeTableOptions() {

    this.tableOptions = {
      inputUrl: {
        getAll: 'v1/categories/getAll',
        getAllMethod: 'GET',
        delete: 'v1/categories/deleteSoft',
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'TEMPLATE-CATEGORIES',
        allowAll: true,
        listOfPermissions: []
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
        filterMode: 'text',
      },
      {
        field: 'nameEn',
        header: 'COMMON.ARABIC_NAME',
        filter: false,
        filterMode: 'text',
      },
      {
        field: 'description',
        header: 'COMMON.DESCRIPTION',
        filter: false,
        filterMode: 'text',
      },
      {
        field: 'createdDate',
        header: 'COMMON.CREATED_DATE',
        filter: false,
        filterMode: 'date',
      },
      {
        field: 'modifiedDate',
        header: 'COMMON.MODIFIED_DATE',
        filter: false,
        filterMode: 'date',
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
