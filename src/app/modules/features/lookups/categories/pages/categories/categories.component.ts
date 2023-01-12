import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslationService } from 'app/modules/core/services/translation/translation.service';
import { TableOptions } from 'app/modules/shared/interfaces/table/table';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  isEnglish = false;
  title = '';
  tableOptions!: TableOptions | undefined;

  /* subscriber to unsubscribe when leaving the component */
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private activatedRoute: ActivatedRoute, private translation: TranslationService) { }

  ngOnInit(): void {
    this.title = this.activatedRoute.snapshot.data['title'];
    this.translation.currentLanguage$.pipe(takeUntil(this.destroy$)).subscribe(() => this.initializeTableOptions());
  }

  initializeTableOptions() {
    this.tableOptions = undefined;

    setTimeout(() => {
      this.tableOptions = {
        inputUrl: {
          getAll: 'Categories/GetAll',
          getAllMethod: 'GET',
          delete: 'Categories/DeleteSoft',
        },
        inputCols: this.initializeTableColumns(),
        inputActions: this.initializeTableActions(),
        responsiveDisplayedProperties: ['nameEn', 'nameAr', 'description', 'createdDate']
      };
    });
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: this.isEnglish ? 'nameEn' : 'nameAr',
        header: 'FIELDS.NAME',
        filter: false,
        filterMode: 'text',
      },
      {
        field: 'description',
        header: 'FIELDS.DESCRIPTION',
        filter: false,
        filterMode: 'text',
      },
      {
        field: 'createdDate',
        header: 'FIELDS.CREATED_DATE',
        filter: false,
        filterMode: 'date',
      },
      {
        field: 'modifiedDate',
        header: 'FIELDS.MODIFIED_DATE',
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
