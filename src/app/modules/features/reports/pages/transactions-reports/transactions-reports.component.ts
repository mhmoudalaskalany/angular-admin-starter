import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslationService } from 'core/services/translation/translation.service';
import { Subject, takeUntil } from 'rxjs';
import { TableComponent } from 'shared/components/table/table.component';
import { TableOptions } from 'shared/interfaces/table/table';

@Component({
  selector: 'app-transactions-reports',
  templateUrl: './transactions-reports.component.html',
  styleUrls: ['./transactions-reports.component.scss']
})
export class TransactionsReportsComponent implements OnInit {

  isEnglish = false;
  title = '';
  filter = null;
  tableOptions!: TableOptions | undefined;

  /* subscriber to unsubscribe when leaving the component */
  private destroy$: Subject<boolean> = new Subject<boolean>();
  
  @ViewChild('tableComponent') tableComponent!: TableComponent;

  constructor(private activatedRoute: ActivatedRoute, private translation: TranslationService) { }

  ngOnInit(): void {
    this.title = this.activatedRoute.snapshot.data['title'];
    this.filter = this.activatedRoute.snapshot.data['table'].filter;

    this.translation.currentLanguage$.pipe(takeUntil(this.destroy$)).subscribe(() => this.initializeTableOptions());
  }

  initializeTableOptions() {
    this.tableOptions = undefined;

    setTimeout(() => {
      this.tableOptions = {
        inputUrl: {
          getAll: 'Transactions/GetTransactionReportDetails',
          getAllMethod: 'POST',
        },
        inputCols: this.initializeTableColumns(),
        inputActions: [],
        responsiveDisplayedProperties: ['productNameEn', 'productNameAr'],
        bodyOptions: {
          pageNumber: 1,
          pageSize: 10,
          orderByValue: [{ colId: 'id', sort: 'asc' }],
          filter: this.filter,
        }
      };
    });
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: 'tranDate',
        header: 'FIELDS.CREATED_DATE',
        filter: false,
        filterMode: 'text'
      },
      {
        field: 'quantitySold',
        header: 'PAYMENTS.TOTAL_SOLD_PRODUCTS',
        filter: false,
        filterMode: 'text',
      },
      {
        field: 'totalTran',
        header: 'PAYMENTS.TOTAL_TRANSACTIONS',
        filter: false,
        filterMode: 'text',
      },
      {
        field: 'totalEarned',
        header: 'FIELDS.TOTAL_AMOUNT',
        filter: false,
        filterMode: 'text',
      }
    ];
  }

  export() {
    const sheetDetails = {
      'tranDate': 'تاريخ المعاملة',
      'quantitySold': 'إجمالي المنتجات المُباعة',
      'totalTran': 'إجمالي عمليات الدفع',
      'totalEarned': 'إجمالي الأرباح',
    };

    this.tableComponent.export(sheetDetails, `${this.activatedRoute.snapshot.routeConfig?.path}-products-report`);
  }

  /* when leaving the component */
  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
