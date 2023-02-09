import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslationService } from 'core/services/translation/translation.service';
import { Subject, takeUntil } from 'rxjs';
import { TableOptions } from 'shared/interfaces/table/table';

@Component({
  selector: 'app-login-history',
  templateUrl: './login-history.component.html',
  styleUrls: ['./login-history.component.scss']
})
export class LoginHistoryComponent implements OnInit {
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
        endPoint: 'v1/loginHistories/getPaged',
        method: 'GET'
      },
      permissions: {
        componentName: 'TEMPLATE-CATEGORIES',
        allowAll: true,
        listOfPermissions: []
      },
      bodyOptions: {
        filter: {}
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      responsiveDisplayedProperties: ['nameEn', 'nameAr', 'createdDate']
    };
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: 'username',
        header: 'FIELDS.USERNAME',
        filter: false,
        filterMode: 'text'
      },
      {
        field: 'platform',
        header: 'FIELDS.PLATFORM',
        filter: false,
        filterMode: 'text'
      },
      {
        field: 'createdDate',
        header: 'FIELDS.LOGINDATE',
        filter: false,
        filterMode: 'date'
      },
      {
        field: 'ipAddress',
        header: 'FIELDS.IPADDRESS',
        filter: false,
        filterMode: 'text'
      },
      {
        field: 'status',
        header: 'FIELDS.LOGINSTATUS',
        filter: false,
        filterMode: 'text'
      },
      {
        field: 'authenticationType',
        header: 'FIELDS.AUTHENTICATIONTYPE',
        filter: false,
        filterMode: 'text'
      },
      {
        field: 'reason',
        header: 'FIELDS.REASON',
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
