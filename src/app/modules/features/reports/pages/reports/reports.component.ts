import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslationService } from 'core/services/translation/translation.service';
import { Subject, takeUntil } from 'rxjs';
import { TableComponent } from 'shared/components/table/table.component';
import { TableOptions } from 'shared/interfaces/table/table';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

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
    this.filter = this.activatedRoute.snapshot.data['filter'];

    this.translation.currentLanguage$.pipe(takeUntil(this.destroy$)).subscribe(() => this.initializeTableOptions());
  }

  initializeTableOptions() {
    this.tableOptions = undefined;

    setTimeout(() => {
      this.tableOptions = {
        inputUrl: {
          getAll: this.activatedRoute.snapshot.data['table'].getAllAPI,
          getAllMethod: 'POST',
        },
        inputCols: this.initializeTableColumns(),
        inputActions: [],
        responsiveDisplayedProperties: ['productNameEn', 'productNameAr'],
        bodyOptions: this.filter
      };
    });
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: this.isEnglish ? 'productNameEn' : 'productNameAr',
        header: 'FIELDS.NAME',
        filter: false,
        filterMode: 'text',
      },
      {
        field: 'productTotal',
        header: 'FIELDS.TOTAL',
        filter: false,
        filterMode: 'text',
      },
    ];
  }

  export() {
    const sheetDetails = {
      'productNameEn': 'إسم المنتج بالإنجليزية',
      'productNameAr': 'إسم المنتج بالعربية',
      'productTotal': 'إحمالي العدد'
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
