import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_Response } from 'app/modules/core/interfaces/response/response';
import { AlertService } from 'app/modules/core/services/alert/alert.service';
import { environment } from 'environments/environment';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { TableOptions } from '../../interfaces/table/table';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  private body: TableOptions['bodyOptions'] = {
    pageNumber: 1,
    pageSize: 10,
    orderByValue: [{ colId: 'id', sort: 'asc' }],
    filter: null,
  };

  searchNew$ = new BehaviorSubject(null);

  constructor(private http: HttpClient, private alertService: AlertService) { }

  getData(url: string): Observable<any> {
    return this.http.get(`${environment.HOST_API}${url}`);
  }

  postData(url: string, body?: TableOptions['bodyOptions']): Observable<any> {
    return this.http.post(`${environment.HOST_API}${url}`, body ? body : this.body);
  }

  delete(url: string, id?: string, appId?: any): Observable<any> {
    if (appId) return this.http.delete(`${environment.HOST_API}${url}/${id}/${appId}`).pipe(map((event: any) => {
      this.alertHandling(event);
      return event.data;
    }));;

    return this.http.delete(`${environment.HOST_API}${url}/${id}`).pipe(map((event: any) => {
      this.alertHandling(event);
      return event.data;
    }));
  }

  private alertHandling(event: API_Response<any>) {
    if (event.status) {
      if (event.status.toString().startsWith('2')) {
        this.alertService.success(event.message ? event.message : 'Successfully Done...');
      } else {
        this.alertService.error(event.message ? event.message : '!NOT HANDLED ERROR!');
      }
    }
  }
}
