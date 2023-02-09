import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslationService } from 'core/services/translation/translation.service';
import { Subject, takeUntil } from 'rxjs';
import { TableOptions } from 'shared/interfaces/table/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
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
        endPoint: 'v1/users/getPaged',
        method: 'POST',
        delete: 'v1/users/DeleteSoft'
      },
      permissions: {
        componentName: 'TEMPLATE-USERS',
        allowAll: true,
        listOfPermissions: []
      },
      bodyOptions: {
        filter: {}
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      responsiveDisplayedProperties: ['nameEn', 'nameAr', 'description', 'createdDate']
    };
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: 'name',
        header: 'FIELDS.NAME',
        filter: false,
        filterMode: 'text'
      },
      {
        field: 'userName',
        header: 'FIELDS.USERNAME',
        filter: false,
        filterMode: 'text'
      },
      {
        field: 'email',
        header: 'FIELDS.EMAIL',
        filter: false,
        filterMode: 'text'
      },
      {
        field: 'phone',
        header: 'FIELDS.PHONE',
        filter: false,
        filterMode: 'text'
      },
      {
        field: 'country',
        header: 'FIELDS.COUNTRY',
        filter: false,
        filterMode: 'text'
      },
      {
        field: 'createdDate',
        header: 'FIELDS.CREATED_DATE',
        filter: false,
        filterMode: 'date'
      },
      // {
      //   field: 'modifiedDate',
      //   header: 'FIELDS.MODIFIED_DATE',
      //   filter: false,
      //   filterMode: 'date',
      // },
      {
        field: 'imageUrl',
        header: 'FIELDS.PHOTO',
        filter: false,
        filterMode: 'image'
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
