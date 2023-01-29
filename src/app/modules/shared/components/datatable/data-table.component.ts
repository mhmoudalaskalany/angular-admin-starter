import { Shell } from 'base/components/shell';
import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TableOptions } from 'shared/interfaces/table/table';
import { TranslationService } from 'core/services/translation/translation.service';
import { ExportExcelService } from 'shared/services/export-excel/export-excel.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit, OnDestroy {
  // Inputs
  @Input() tableOptions!: TableOptions;
  @Input() totalCount: number = 0;
  @Input() pageSize: number = 0;
  @Input() set data(value) {
    this._data.next(value);
  }

  get data() {
    return this._data.getValue();
  }
  finalData: any[] = [];
  permissions: any = {};
  // Output

  @Output() event: EventEmitter<any> = new EventEmitter<any>();

  /* hold the current route */
  currentRoute;
  private _data = new BehaviorSubject<any[]>([]);
  /* subscriber to unsubscribe when leaving the component */
  private destroy$: Subject<boolean> = new Subject<boolean>();
  // services
  get dialog(): MatDialog { return Shell.Injector.get(MatDialog); }
  get localize(): TranslationService { return Shell.Injector.get(TranslationService); }
  get router(): Router { return Shell.Injector.get(Router); }
  get excel(): ExportExcelService { return Shell.Injector.get(ExportExcelService); }
  constructor() {
    this.currentRoute = this.router.url.substring(0, this.router.url.length - 3);
  }

  ngOnInit(): void {
    this.permissions = this.tableOptions.permissions;
    this._data.subscribe((x) => {
      this.finalData = this.data;
      console.log('data at data table at ngOnInit', this.finalData);
    });
  }


  loadLazyLoadedData($event: any): void {
    this.event.emit({ data: $event, eventType: 'lazyLoad' })
  }

  getCellData(row: any, col: any): any {
    const nestedProperties: string[] = col.field.split('.');
    let value: any = row;
    for (const prop of nestedProperties) {
      if (value[prop] == null) {
        return '';
      }
      value = value[prop];
    }
    return value;
  }


  filter(value?: any, column?: any, filterColumnName?: string, dataType?: string): void {
    this.event.emit({ eventType: 'filter' });
  }


  delete(id: any): void {
    this.event.emit({ data: id, eventType: 'delete' });
  }

  export(columnNames: any, reportName: any): void {
    this.event.emit({ data: columnNames, reportName, eventType: 'export' });
  }

  /* when leaving the component */
  ngOnDestroy() {
    this.event.emit({ eventType: 'reset' });
    this._data.unsubscribe();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
