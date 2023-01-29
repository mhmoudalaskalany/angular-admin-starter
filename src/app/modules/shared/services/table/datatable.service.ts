import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { TableOptions } from 'shared/interfaces/table/table';
import { Shell } from 'base/components/shell';
import { ConfigService } from 'core/services/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class DataTableService {

  opt: TableOptions['bodyOptions'] = {
    pageNumber: 1,
    pageSize: 10,
    orderByValue: [{ colId: 'id', sort: 'asc' }],
    filter: {}
  };
  hostApi: string;
  public searchNew$: BehaviorSubject<{}> = new BehaviorSubject({});
  get config(): ConfigService { return Shell.Injector.get(ConfigService); }
  constructor(private http: HttpClient) {
    this.hostApi = this.config.getAppUrl('HOST_API');
  }

  loadData(url?: string): Observable<any> {
    return this.http.post(this.hostApi + url, this.opt);
  }

  delete(url?: any, id?: string, appId?: any): Observable<any> {
    if (appId) {
      return this.http.delete(this.hostApi + url + '/' + id + '/' + appId);
    }
    return this.http.delete(this.hostApi + url + '/' + id);
  }
}
