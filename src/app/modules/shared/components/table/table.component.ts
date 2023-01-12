import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { NavigationEnd, Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { debounceTime, distinctUntilChanged, filter, Subject, take, takeUntil } from 'rxjs';

import { TableOptions } from '../../interfaces/table/table';
import { ExportExcelService } from '../../services/export-excel/export-excel.service';
import { TableService } from '../../services/table/table.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  // Inputs
  @Input() tableOptions!: TableOptions;

  // fields
  /* hold Columns Definitions */
  cols: TableOptions['inputCols'] = [];
  /* hold actions */
  actions: TableOptions['inputActions'] = [];
  /* hold the urls fro get and delete */
  url!: TableOptions['inputUrl'];
  /* hold bodyOptions */
  bodyOptions!: TableOptions['bodyOptions'];

  /* hold the data */
  data: any[] = [];
  /* total count of records */
  totalCount = 0;
  /* hold the component name */
  componentName!: string | undefined;
  /* hold the permissions */
  permissions: string[] = [];

  /* load data at first time */
  private firstInit!: boolean;
  /* subscriber to unsubscribe when leaving the component */
  private destroy$: Subject<boolean> = new Subject<boolean>();

  @Output() rows = new EventEmitter<any[]>();

  constructor(private Dialog: MatDialog, private service: TableService, private router: Router, private exportExcelService: ExportExcelService) { }

  ngOnInit(): void {
    this.initializeInputs();
    // this.loadDataFromServer();
    this.columnSearchInput();

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd), takeUntil(this.destroy$)).subscribe((e: any) => {
      if (!e.url.includes('edit') && !e.url.includes('add')) this.loadDataFromServer();
    });
  }

  initializeInputs(): void {
    // initialize url from config service
    this.url = this.tableOptions.inputUrl;

    // initialize columns
    const cols = this.tableOptions.inputCols.filter(col => this.tableOptions.responsiveDisplayedProperties.includes(col.field));
    if (innerWidth <= 768) this.cols = cols; else this.cols = this.tableOptions.inputCols;
    this.actions = this.tableOptions.inputActions;
    if (this.tableOptions.bodyOptions) this.bodyOptions = JSON.parse(JSON.stringify(this.tableOptions.bodyOptions));
    this.permissions = this.tableOptions.permissions?.listOfPermissions || [];
    this.componentName = this.tableOptions.permissions?.componentName;
  }

  /* get search value when typing on column search box */
  columnSearchInput(): void {
    this.service.searchNew$.pipe(debounceTime(1000), distinctUntilChanged(), takeUntil(this.destroy$)).subscribe(() => {
      this.firstInit ? this.loadDataFromServer() : this.firstInit = true;
    });
  }

  // load data from server
  loadDataFromServer(): void {
    if (this.url.getAllMethod === 'GET') {
      this.service.getData(this.url.getAll).subscribe(res => (this.data = res.data, this.rows.emit(this.data)));
    } else if (this.url.getAllMethod === 'POST') {
      this.service.postData(this.url.getAll, this.bodyOptions).subscribe((res: any) => {
        this.data = res.data.data;
        this.rows.emit(this.data);
        this.totalCount = res.data.totalCount;
      });
    }
  }

  /* lazy load table data */
  /* note:  gets called on entering component */
  loadLazyLoadedData(event?: LazyLoadEvent): void {
    this.resetOpt();
    this.setSortColumn(event);
    this.setPaging(event);
    this.loadDataFromServer();
  }

  // get cell data
  getCellData(row: any, property: any): any {
    let mainProperty, subProperty;

    if (property.includes('.')) { // Ex. task.name
      mainProperty = property.split('.').shift() as string;
      subProperty = property.split('.').pop() as string;

      if (mainProperty.includes('[0]')) { // Ex. roles[0].name
        const arrayProperty = mainProperty.split('[0]').shift() as string;

        if (row[arrayProperty][0]) return row[arrayProperty][0][subProperty] ? row[arrayProperty][0][subProperty] : '-';
        else return '-';
      }

      return row[mainProperty] ? row[mainProperty][subProperty] : '-';
    } else {
      mainProperty = property;

      return row[mainProperty] ? row[mainProperty] : '-';
    }
  }

  /* set SortColumn */
  setSortColumn(event?: LazyLoadEvent): void {
    if (this.bodyOptions?.orderByValue) {
      this.bodyOptions.orderByValue = [{
        colId: event?.sortField as string,
        sort: event?.sortOrder === 1 ? 'asc' : 'desc',
      }];
    }
  }

  /* set paging parameters*/
  setPaging(event?: LazyLoadEvent): void {
    if (this.bodyOptions?.pageSize) this.bodyOptions.pageSize = (event?.rows as number);
    if (this.bodyOptions?.pageNumber) this.bodyOptions.pageNumber = ((event?.first as number) / (event?.rows as number)) + 1;
  }

  /* reset server opt */
  resetOpt(): void {
    this.bodyOptions = this.tableOptions.bodyOptions;
  }

  // Delete Modal
  openDeleteModal(id: string): void {
    const modal = this.Dialog.open(DeleteModalComponent, {
      disableClose: true,
      panelClass: ['small', 'p-0'],
    });

    const subscription = modal.afterClosed().subscribe((dialogResult: boolean) => {
      if (dialogResult) {
        if (this.tableOptions.app) {
          this.deleteByAppId(id, this.tableOptions.app.appId);
        } else {
          this.deleteById(id);
        }
      }

      subscription.unsubscribe();
    });
  }

  // deleteByAppId
  deleteByAppId(id?: any, appId?: any): void {
    this.service.delete(this.url.delete as string, id, appId).pipe(take(1)).subscribe((x) => {
      this.loadDataFromServer();
    });
  }

  // deleteById
  deleteById(id?: any): void {
    this.service.delete(this.url.delete as string, id).pipe(take(1)).subscribe((x) => {
      this.loadDataFromServer();
    });
  }

  // Filter
  filter(target: any, column: any, filterColumnName: string, dataType: string): void {
    this.resetOpt();
    target.value = this.convertDataType(target.value, dataType);

    if (this.bodyOptions?.filter) {
      if (filterColumnName !== undefined && filterColumnName !== '' && filterColumnName !== null) {
        this.service.searchNew$.next(this.bodyOptions.filter[filterColumnName] = target.value);
      } else {
        this.service.searchNew$.next((this.bodyOptions.filter[column] = target.value));
      }
    }
  }

  // convertDataType
  convertDataType(value: string, dataType?: string): string | number {
    if (dataType === 'number') return +value;

    return value;
  }

  get isFilterEnabled() {
    return this.cols.some(col => col.filter);
  }

  getFinalRoute(actionRoute: string | undefined, id: string) {
    if (!actionRoute?.includes('{') && !actionRoute?.includes('}')) return `${actionRoute + id}`;

    if (actionRoute?.includes('{') && actionRoute?.includes('}')) return actionRoute.replace(/{id}/g, id);

    return '';
  }

  export(sheetDetails: { [k: string]: string; }, fileName: string) {
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

    this.exportExcelService.exportAsExcelFile(newArray, fileName);
  }

  getCustomClass(row: any) {
    const action = this.actions?.find(action => action.displayBasedOn);
    return action?.displayBasedOn && !row[action?.displayBasedOn];
  }

  /* when leaving the component */
  ngOnDestroy() {
    this.service.searchNew$.next(null);
    this.resetOpt();
    this.firstInit = false;
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
