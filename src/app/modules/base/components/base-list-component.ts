import { Directive, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { TableOptions } from 'shared/interfaces/table/table';
import { DataTableService } from 'shared/services/table/datatable.service';
import { BaseComponent } from './base-component';
import { Shell } from './shell';

@Directive()
export abstract class BaseListComponent extends BaseComponent implements OnInit {
  data: any[] = [];
  totalCount: number = 0;
  /* load data at first time */
  private firstInit: boolean = true;
  abstract tableOptions: TableOptions;
  protected destroy$: Subject<boolean> = new Subject<boolean>();
  get dataTableService(): DataTableService {
    return Shell.Injector.get(DataTableService);
  }

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.loadDataFromServer();
  }

  /**
   * Handle Data Table Event (Sort , Pagination , Filter , Delete , Print)
   * @param dataTableEvent
   */
  handleEvent(dataTableEvent: any): void {
    if (!this.firstInit) {
      if (dataTableEvent.eventType == 'lazyLoad') {
        this.loadLazyLoadedData(dataTableEvent.data);
      }
      if (dataTableEvent.eventType == 'reset') {
        this.resetOpt();
      }

      if (dataTableEvent.eventType == 'filter') {
        this.resetOpt();
      }

      if (dataTableEvent.eventType == 'delete') {
        this.resetOpt();
      }
      if (dataTableEvent.eventType == 'export') {
        this.export(dataTableEvent.data.columnNames, dataTableEvent.data.reportName);
      }
    }
  }

  columnSearchInput(): void {
    this.dataTableService.searchNew$.pipe(debounceTime(1000), distinctUntilChanged(), takeUntil(this.destroy$)).subscribe(() => {
      this.firstInit ? this.loadDataFromServer() : (this.firstInit = true);
    });
  }

  // load data from server
  loadDataFromServer(): void {
    this.dataTableService.loadData(this.tableOptions.inputUrl?.endPoint).subscribe((res: any) => {
      this.data = res.data.data;
      this.totalCount = res.data.totalCount;
    });
  }
  /* lazy load table data */
  /* note:  gets called on entering component */
  loadLazyLoadedData(event: LazyLoadEvent): void {
    this.resetOpt();
    this.setSortColumn(event);
    this.setPaging(event);
    this.loadDataFromServer();
  }

  /* set SortColumn */
  setSortColumn(event: LazyLoadEvent): void {
    this.dataTableService.opt.orderByValue = [];
    this.dataTableService.opt.orderByValue.push({
      colId: event.sortField,
      sort: event.sortOrder === 1 ? 'asc' : 'desc'
    });
  }
  /* set paging parameters*/
  setPaging(event?: LazyLoadEvent): void {
    if (event) {
      this.dataTableService.opt.pageSize = event.rows == 0 ? 10 : event.rows;
      this.dataTableService.opt.pageNumber =
        event.first !== undefined && event.rows !== undefined && event.rows != 0 ? event.first / event.rows + 1 : 1;
    }
  }

  // Filter
  filter(value?: any, column?: any, filterColumnName?: string, dataType?: string): void {
    this.resetOpt();
    value = this.checkDataType(value, dataType);
    if (filterColumnName !== undefined && filterColumnName !== '' && filterColumnName !== null) {
      this.dataTableService.searchNew$.next((this.dataTableService.opt.filter[filterColumnName] = value));
    } else {
      this.dataTableService.searchNew$.next((this.dataTableService.opt.filter[column] = value));
    }
  }

  checkDataType(value: any, dataType?: string): any {
    if (dataType === 'number') {
      value = +value;
    }
    return value;
  }

  /* reset server options */
  resetOpt(): void {
    this.dataTableService.opt = {
      pageNumber: 1,
      pageSize: 10,
      orderByValue: [{ colId: 'id', sort: 'asc' }],
      filter: {}
    };
    this.dataTableService.opt.filter =
      this.tableOptions.bodyOptions.filter !== null && this.tableOptions.bodyOptions.filter !== undefined
        ? this.tableOptions.bodyOptions.filter
        : this.dataTableService.opt.filter;
    this.dataTableService.opt.filter.appId = this.tableOptions.appId !== 0 ? this.tableOptions.appId : 0;
  }

  export(sheetDetails: { [k: string]: string }, fileName: string) {
    const sheetColumnsValues = Object.keys(sheetDetails);

    const newArray = this.data.map((eachData, index) => {
      let eachRow = {};

      sheetColumnsValues.map(eachColumnValue => {
        eachRow = {
          ...eachRow,
          ...{ '#': index + 1 },
          [sheetDetails[eachColumnValue]]: eachData[eachColumnValue]
        };
      });

      return eachRow;
    });

    this.excel.exportAsExcelFile(newArray, fileName);
  }

  /* when leaving the component */
  ngOnDestroy() {
    this.dataTableService.searchNew$.next({});
    this.dataTableService.searchNew$.unsubscribe();
  }
  Redirect() {
    const currentRoute = this.route.url;
    const index = currentRoute.lastIndexOf('/');
    const str = currentRoute.substring(0, index);
    this.route.navigate([str]);
  }
}
